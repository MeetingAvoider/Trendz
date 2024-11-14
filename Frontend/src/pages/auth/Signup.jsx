import React, { useState } from "react";
import CommonForm from "@/components/common/form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "@/store/auth-slice";
import { registerFormControls } from "@/config";
import { useToast } from "@/hooks/use-toast";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

function Signup() {
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();

  function handleSubmit(event) {
    event.preventDefault();

    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        console.log("success");
        toast({
          title: data?.payload?.message,
        });
        navigate("/auth/login");
      } else {
        console.log("failed");

        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  }
  console.log(formData);

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-serif tracking-tight text-foreground">
          Create an Account
        </h1>
      </div>
      <CommonForm
        formData={formData}
        onSubmit={handleSubmit}
        buttonText={"Sign up"}
        setFormData={setFormData}
        formControls={registerFormControls}
      />
      <p className="text-2xl font-serif text-red-500 tracking-tight text-center">
        Already have an account?
        <Link
          className="ml-3 font-extrabold hover:text-red-900 hover:underline"
          to="/auth/login"
        >
          Login
        </Link>
      </p>
    </div>
  );
}

export default Signup;
