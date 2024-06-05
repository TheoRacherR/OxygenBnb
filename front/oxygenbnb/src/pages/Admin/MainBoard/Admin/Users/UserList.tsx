import Table from "@mui/joy/Table";
import { Sheet, Button, ButtonGroup } from "@mui/joy";
import { Link } from "react-router-dom";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { useTranslation } from "react-i18next";
import TopLevelPanel from "../../TopLevelPanel";
import styles from "./UserList.module.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

const enum userRole {
  USER = "user",
  RENTER = "renter",
  ADMIN = "admin",
}

interface UserFormated {
  id: number;
  firstname: string;
  lastname: string;
  role: userRole;
  created_at: Date;
}

interface UserRaw {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  created_at: Date;
  updated_at: Date;
  role: userRole;
}

const UserList = () => {
  const { t } = useTranslation(["admin"]);
  const [userData, setUserData] = useState<UserRaw[]>([]);

  const fetchUsers = async () => {
    const usersRaw: { any; data: UserRaw[] } = await axios.get(
      "http://localhost:3333" + "/user"
    );
    console.log(usersRaw.data);
    // const userFormated: UserFormated[] = usersRaw.data.map((item) => ({
    //   id: item.id,
    //   firstname: item.firstname,
    //   lastname: item.lastname,
    //   role: item.role,
    //   created_at: item.created_at
    // }))
    // console.log(userFormated);
    setUserData(usersRaw.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className={styles.container}>
      <TopLevelPanel
        title={t("admin:admin.users.user_list_tsx.title")}
        currentPageTitle={t("admin:admin.users.user_list_tsx.currentPageTitle")}
        pathValues={[]}
      />
      <div className={styles.main_list}>
        <Sheet
          variant="outlined"
          sx={{
            borderRadius: "10px",
            padding: "10px",
            maxWidth: "100%",
            overflow: "auto",
            maxHeight: "100%",
            backgroundColor: "#0A0E0F",
            borderColor: "grey",
          }}
        >
          {userData.length === 0 ? (
            <div style={{ color: "white" }}>
              {t("admin:admin.users.user_list_tsx.no_user")}
            </div>
          ) : (
            <Table sx={{ borderRadius: 20, color: "#fff" }}>
              <thead>
                <tr>
                  <th>{t("admin:admin.users.user_list_tsx.table.id")}</th>
                  <th>{t("admin:admin.users.user_list_tsx.table.name")}</th>
                  <th>{t("admin:admin.users.user_list_tsx.table.role")}</th>
                  <th>
                    {t("admin:admin.users.user_list_tsx.table.creation_date")}
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {userData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>
                      {item.firstname} {item.lastname}
                    </td>
                    <td>{item.role}</td>
                    <td>
                      {dayjs(item.created_at).format(
                        t("admin:admin.users.user_list_tsx.format")
                      )}
                    </td>
                    <td>
                      <ButtonGroup sx={{ borderRadius: 6 }} variant="solid">
                        <Link to={`/admin/user/${item.id}`}>
                          <Button color="primary">
                            <ArrowForwardIosRoundedIcon fontSize="small" />
                          </Button>
                        </Link>
                      </ButtonGroup>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Sheet>
      </div>
    </div>
  );
};

export default UserList;
