import React, { useEffect, useState } from 'react';
import { createContext } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { app } from '../Firebase/firebase.config';
import useAxiosPublic from '../Components/hooks/useAxiosPublic';



export const AuthContext = createContext(null);
const auth = getAuth(app);
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    const axiosPublic = useAxiosPublic();

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    // const logOut = () => {
    //     setLoading(true);
    //     return signOut(auth);
    // }

    const logOut = () => {
        setLoading(true);
        return signOut(auth)
          .then(() => {
              localStorage.removeItem('Access-token'); // Remove token
          })
          .catch(error => console.error("Logout Error:", error))
          .finally(() => setLoading(false));
    };
    

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser,
            {
                displayName: name,
                photoURL: photo,
            }

        )
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                const userInfo = { email: currentUser.email };
                axiosPublic.post('/jwt', userInfo)
                  .then(res => {
                    if (res.data.token) {
                        localStorage.setItem('Access-token', res.data.token);
                    }
                  })
                  .catch(err => console.error("Error generating token:", err));
            } else {
                localStorage.removeItem('Access-token');
            }
            console.log("current User->", currentUser);
            setLoading(false);
        });
        return () => {
            return unsubscribe()
        };
    }, [axiosPublic]);


    const authInfo = {
        user,
        setUser,
        loading,
        createUser,
        updateUserProfile,
        signIn,
        googleSignIn,
        logOut
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
