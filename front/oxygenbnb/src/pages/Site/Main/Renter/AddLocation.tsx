import { useContext } from "react";
import styles from "./AddLocation.module.scss";

import Preview from "./AddLocation/Preview";
import Form from "./AddLocation/Form";
import { FormAddLocationContext, FormAddLocationContextProvider } from "../../../../utils/Context/FormAddLocationContext";

const AddLocation = () => {
  const {
    state
  } = useContext(FormAddLocationContext)

  const handleCreateRental = () => {
    console.log("created")
    //todo set context empty
  }

  return (
    <div className={styles.container}>
      {state === "Form" ? (
        <Form handleCreateRental={handleCreateRental}/>
      ) : (
        <Preview handleCreateRental={handleCreateRental}/>
      )}
    </div>
  );
};



const Main = () => {
  return (
    <FormAddLocationContextProvider>
      <AddLocation/>
    </FormAddLocationContextProvider>
  )
}

export default Main