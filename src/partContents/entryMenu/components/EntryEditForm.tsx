import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { useGetSavedData } from "../../../hooks/useGetSavedData";

type Props = {
  entryId: string;
};

export default function EntryEditForm(props: Props): JSX.Element {
  const { entryId } = props;
  const { getSavedDataInUse } = useGetSavedData();
  const savedDataInUse = getSavedDataInUse();
  const entryMap = savedDataInUse.entryMap;
  const entry = entryMap[entryId];

  const methodsOfUseForm = useForm({
    defaultValues: {
      // Define your default values here
    },
  });

  const { register, handleSubmit} = methodsOfUseForm;

  const onSubmit: SubmitHandler<any> = (data) => {
    console.log("Submitted data:", data);
  };

  return (
    <FormProvider {...methodsOfUseForm}>
      <form onSubmit={handleSubmit(onSubmit)}></form>
    </FormProvider>
  );
}
