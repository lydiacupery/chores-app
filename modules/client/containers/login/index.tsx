import * as React from "react";
import { withApollo } from "react-apollo";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { ApolloClient } from "apollo-client";
import { LoginUIProps, LoginFields, LoginUI } from "./login-ui";
import { createLoginMutation } from "client/graphql-mutations/create-login-mutation";
import Auth from "client/Auth/Auth";

export interface ConnectedProps {
  readonly client: ApolloClient;
}

function mapDispatchToProps(
  dispatch: Dispatch<any>,
  props: ConnectedProps
): {} {
  return {
    onSubmit(form: CompletedForm) {
      // createLoginMutation(props.client, form);
      /*
      console.log("LOGGING IN WITH AUTH", auth.isAuthenticated());
      auth.login();
      auth.handleAuthentication();
      console.log("LOGGED IN WITH AUTH", auth.isAuthenticated());
      */
    }
  };
}

type CompletedForm = { readonly [k in LoginFields]: string };
type InProgressForm = Partial<CompletedForm>;
type FormState = { form: InProgressForm };
type FormProps = { onSubmit: (form: CompletedForm) => void };

function isComplete(form: InProgressForm): form is CompletedForm {
  const vals = form as any;
  return Object.values(LoginFields).every(x => vals[x] && /\S/.test(vals[x]));
}

class ManagedForm extends React.Component<FormProps, FormState> {
  constructor(props: FormProps) {
    super();
    this.state = { form: {} };
  }

  update = (loginFields: LoginFields, value: string) => {
    this.setState({ form: { ...this.state.form, [loginFields]: value } });
  };

  onSubmit = () => {
    const form = this.state.form;
    if (isComplete(form)) {
      this.props.onSubmit(form);
      this.setState({ form: {} });
    } else {
      alert("Finish the form");
    }
  };

  render() {
    const { form } = this.state;
    const uiProps: LoginUIProps = {
      onSave: this.onSubmit,
      onFieldChanged: this.update,
      fields: {
        username: form.username || "",
        password: form.password || ""
      }
    };
    return <LoginUI {...uiProps} />;
  }
}

const connected = connect(undefined, mapDispatchToProps);

export const LoginContainer = withApollo(connected(ManagedForm));
