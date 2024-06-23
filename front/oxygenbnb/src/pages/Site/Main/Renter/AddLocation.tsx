import { useContext, useEffect } from "react";
import styles from "./AddLocation.module.scss";

import Preview from "./AddLocation/Preview";
import Form from "./AddLocation/Form";
import {
  FormAddLocationContext,
  FormAddLocationContextProvider,
} from "@utils/Context/FormAddLocationContext";
import { useNavigate } from "react-router-dom";
import { verifyRole } from "@utils/utils";

const AddLocation = () => {
  const { state } = useContext(FormAddLocationContext);

  const navigate = useNavigate();
  const checkRole = async () => {
    const role = await verifyRole();
    if (role !== "renter") {
      console.log("Not renter, redirect");
      return navigate("/");
    }
  };

  useEffect(() => {
    checkRole();
    console.log("first")
  });

  return (
    <div className={styles.container}>
      {state === "Form" ? <Form /> : <Preview />}
    </div>
  );
};

const Main = () => {
  return (
    <FormAddLocationContextProvider>
      <AddLocation />
    </FormAddLocationContextProvider>
  );
};

export default Main;
