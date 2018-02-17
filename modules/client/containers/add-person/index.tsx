import * as React from "react";
import { withApollo } from "react-apollo";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { ApolloClient } from "apollo-client";
import {
  AddPersonFields,
  AddPersonUIProps,
  AddPersonUI
} from "client/containers/add-person/add-person-ui";
import { addPersonMutation } from "client/graphql-mutations/add-person-mutation";

export interface ConnectedProps {
  readonly client: ApolloClient;
}

function mapDispatchToProps(
  dispatch: Dispatch<any>,
  props: ConnectedProps
): {} {
  return {
    onSubmit(form: CompletedForm) {
      addPersonMutation(props.client, form);
    }
  };
}

type CompletedForm = { readonly [k in AddPersonFields]: string };
type InProgressForm = Partial<CompletedForm>;
type FormState = { form: InProgressForm };
type FormProps = { onSubmit: (form: CompletedForm) => void };

function isComplete(form: InProgressForm): form is CompletedForm {
  const vals = form as any;
  return Object.values(AddPersonFields).every(
    x => vals[x] && /\S/.test(vals[x])
  );
}

class ManagedForm extends React.Component<FormProps, FormState> {
  constructor(props: FormProps) {
    super();
    this.state = { form: {} };
  }

  update = (update: AddPersonFields, value: string) => {
    this.setState({ form: { ...this.state.form, [update]: value } });
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
    const uiProps: AddPersonUIProps = {
      onSave: this.onSubmit,
      onFieldChanged: this.update,
      fields: {
        firstName: form.firstName || "",
        lastName: form.lastName || ""
      }
    };
    return <AddPersonUI {...uiProps} />;
  }
}

const connected = connect(undefined, mapDispatchToProps);

export const AddPersonContainer = withApollo(connected(ManagedForm));
