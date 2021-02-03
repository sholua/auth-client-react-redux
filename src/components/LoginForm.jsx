import React from "react";
import * as Yup from "yup";
import { Redirect, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { login } from "../store/auth";
import { AppForm, AppFormField, SubmitButton } from "./forms";

const validationSchema = Yup.object().shape({
  username: Yup.string().email().required().label("Username"),
  password: Yup.string().required().label("Password"),
});

export default function LoginForm() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);

  const handleSubmit = (values, actions) => {
    const { username, password } = values;

    dispatch(login(username, password));
  };

  if (currentUser) return <Redirect to="/home" />;

  return (
    <div>
      <h1>Login</h1>
      <AppForm
        initialValues={{ username: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <AppFormField
          name="username"
          type="email"
          label="Username"
          placeholder="Enter your email"
        />

        <AppFormField
          name="password"
          type="password"
          label="Password"
          placeholder="Enter your password"
        />

        <SubmitButton title="Submit" />
        <div>
          <Link to="/forgot_password">Forgot password?</Link>
        </div>
      </AppForm>
    </div>
  );
}

// class LoginForm extends Form {
//   state = {
//     data: {
//       username: "",
//       password: "",
//     },
//     errors: {},
//   };

//   joiKeys = {
//     username: Joi.string().required().label("Username"),
//     password: Joi.string().required().label("Password"),
//   };

//   doSubmit = async () => {
//     try {
//       const { data } = this.state;
//       await this.props.login(data.username, data.password);
//     } catch (ex) {
//       if (ex.response && ex.response.status === 400) {
//         const errors = { ...this.state.errors, ...ex.response.data };
//         this.setState({ errors });
//       }
//     }
//   };

//   render() {
//     if (this.props.currentUser) return <Redirect to="/home" />;

//     return (
//       <div>
//         <h1>Login</h1>
//         <form onSubmit={this.handleSubmit}>
//           {this.renderInput("username", "Username")}
//           {this.renderInput("password", "Password", "password")}
//           {this.renderButton("Login")}
//           <div>
//             <Link to="/forgot_password">Forgot password?</Link>
//           </div>
//         </form>
//       </div>
//     );
//   }
// }

// const mapStateToProps = (state) => ({
//   currentUser: state.auth.currentUser,
// });

// export default connect(mapStateToProps, { login })(LoginForm);
