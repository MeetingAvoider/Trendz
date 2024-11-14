import CommonForm from "@/components/common/form";
import { loginFormControls } from "@/config";
import { useState } from "react";
import { Link } from "react-router-dom";
function Login() {
  const intialState = {
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(intialState);
  function handleSubmit() {}
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-serif tracking-tighter text-foreground">
          Sign in
        </h1>
      </div>
      <CommonForm
        formData={formData}
        onSubmit={handleSubmit}
        buttonText={"Login"}
        setFormData={setFormData}
        formControls={loginFormControls}
      />
      <p className="text-2xl font-serif text-red-500 tracking-tight text-center ">
        Create a new Account
        <Link
          className=" ml-3 font-extrabold hover:text-red-900 hover:underline"
          to="/auth/signup"
        >
          Register
        </Link>
      </p>
      <p>
        <Link to={"Upcoming pages"} className="text-red-500  font-extrabold">
          Forget Passsword
        </Link>
      </p>
    </div>
  );
}

export default Login;
