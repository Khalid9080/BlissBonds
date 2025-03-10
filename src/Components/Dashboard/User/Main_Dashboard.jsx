import React from "react";
import {
  Navbar,
  Collapse,
  Button,
  IconButton,
  Typography,
  Input,
} from "@material-tailwind/react";
import SuccessStoryForm from "./Story/SuccessStoryForm";

function HeroSection16() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpen(false)
    );
  }, []);

  return (
    <header className="bg-white p-8">
      <div className="grid  min-h-[82vh] w-full lg:h-[54rem] md:h-[34rem] place-items-stretch bg-center bg-contain bg-no-repeat ">
        <div className="container mx-auto px-4 text-center">
          <Typography
                        variant="h1"
                        color="blue-gray"
                        className="mx-auto my-6 w-full leading-snug  !text-2xl lg:max-w-3xl lg:!text-5xl"
                      >
                        <h1 className="pinyon-script-regular lg:!text-6xl">WELCOME TO <span className="pinyon-script-regular">BlissBonds</span>💖</h1>

                        <h3 className="mt-6 gloock-regular text-4xl"> Where Soulmate Unites, {" "}
                        <span className="text-pink-500 leading-snug ">
                         Love {" "}
                        </span  >Flourishes{" "}
                        &{" "}
                        <span className="leading-snug text-pink-500 gloock-regular">
                        Forever 
                        </span> Begines!💍.</h3>
                      </Typography>
          <Typography
            variant="lead"
            className="mx-auto w-full !text-gray-500 lg:text-lg text-base gilda-display-regular"
          >
            The time is now for it to be okay to be great. For being a bright
            color. For standing out.
          </Typography>
        </div>
        <div className="mt-20 ">
          <SuccessStoryForm></SuccessStoryForm>
        </div>
        
      </div>
    </header>
  );
}

const Main_Dashboard = () => {
  return (
    <div>
      {/* Render HeroSection16 at the top of the dashboard */}
      <HeroSection16 />
      
      
    </div>
  );
};

export default Main_Dashboard;
