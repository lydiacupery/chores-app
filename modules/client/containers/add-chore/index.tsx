import * as React from "react";
import { withApollo } from "react-apollo";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { ApolloClient } from "apollo-client";
import { addChoreMutation } from "client/graphql-mutations/add-chore-mutation";
import {
  AddChoreFields,
  AddChoreUIProps,
  AddChoreUI
} from "client/containers/add-chore/add-chore-ui";

export interface ConnectedProps {
  readonly client: ApolloClient;
}

function mapDispatchToProps(
  dispatch: Dispatch<any>,
  props: ConnectedProps
): {} {
  return {
    onSubmit(form: CompletedForm) {
      addChoreMutation(props.client, form);
    }
  };
}

type CompletedForm = { readonly [k in AddChoreFields]: string };
type InProgressForm = Partial<CompletedForm>;
type FormState = { form: InProgressForm };
type FormProps = { onSubmit: (form: CompletedForm) => void };

function isComplete(form: InProgressForm): form is CompletedForm {
  const vals = form as any;
  return Object.values(AddChoreFields).every(
    x => vals[x] && /\S/.test(vals[x])
  );
}

class ManagedForm extends React.Component<FormProps, FormState> {
  constructor(props: FormProps) {
    super();
    this.state = { form: {} };
  }

  update = (name: AddChoreFields, value: string) => {
    this.setState({ form: { ...this.state.form, [name]: value } });
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
    const uiProps: AddChoreUIProps = {
      onSave: this.onSubmit,
      onFieldChanged: this.update,
      fields: {
        name: form.name || ""
      }
    };
    return <AddChoreUI {...uiProps} />;
  }
}

const connected = connect(undefined, mapDispatchToProps);

export const AddChoreContainer = withApollo(connected(ManagedForm));
