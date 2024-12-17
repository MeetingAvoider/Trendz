import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { registerUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

function Signup() {
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  function handleSubmit(event) {
    event.preventDefault();
    dispatch(registerUser(formData))
      .then((data) => {
        if (data?.payload?.success) {
          console.log("success");
          toast({
            title: "Success",
            description: data?.payload?.message,
            status: "success",
          });
          navigate("/auth/login");
        } else {
          toast({
            title: "Signup failed",
            description: data?.payload?.message || "An error occurred",
            status: "error",
          });
        }
      })
      .catch((error) => {
        toast({
          title: "Signup failed",
          description: error.message || "An error occurred",
          status: "error",
        });
      });
  }

  return (
    <div>
      <CommonForm
        formControls={registerFormControls}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        buttonText={"Submit"}
      />
      <Link to="/auth/login">Already have an account? Login</Link>
    </div>
  );
}
export default Signup;
