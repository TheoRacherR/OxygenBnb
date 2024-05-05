import Table from "@mui/joy/Table";
import { Sheet, Button, ButtonGroup } from "@mui/joy";
import { Link } from "react-router-dom";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { useTranslation } from "react-i18next";
import TopLevelPanel from "../../TopLevelPanel";
import styles from "./UserList.module.scss";

const enum userRole {
  USER = "user",
  RENTER = "renter",
  ADMIN = "admin",
}

const userData: {
  id: number;
  first_name: string;
  last_name: string;
  role: userRole;
  created_at: Date;
}[] = [
  {
    id: 1,
    first_name: "Théo",
    last_name: "RACHER RAULIN",
    role: userRole.ADMIN,
    created_at: new Date("10-05-2023"),
  },
  {
    id: 2,
    first_name: "Franck",
    last_name: "DUPOND",
    role: userRole.USER,
    created_at: new Date("10-12-2023"),
  },
  {
    id: 3,
    first_name: "Lilia",
    last_name: "OBS",
    role: userRole.RENTER,
    created_at: new Date("31-04-2023"),
  },
  {
    id: 4,
    first_name: "Laurent",
    last_name: "ROLLS",
    role: userRole.RENTER,
    created_at: new Date("11-05-2022"),
  },
  {
    id: 5,
    first_name: "Sylvestre",
    last_name: "ARCHI",
    role: userRole.USER,
    created_at: new Date("21-03-2024"),
  },
];

const UserList = () => {
  const { t } = useTranslation(["admin_admin"]);

  return (
    <div className={styles.container}>
      <TopLevelPanel
        // title={t("admin_admin:users.user_list_tsx.title")}
        // currentPageTitle={t("admin_admin:users.user_list_tsx.currentPageTitle")}
        title="All Users"
        currentPageTitle="Users"
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
          <Table sx={{ borderRadius: 20, color: "#fff" }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Role</th>
                <th>Creation date</th>
                {/* <th>{t("admin_admin:users.user_list_tsx.table.id")}</th>
                <th>{t("admin_admin:users.user_list_tsx.table.name")}</th>
                <th>{t("admin_admin:users.user_list_tsx.table.role")}</th>
                <th>{t("admin_admin:users.user_list_tsx.table.creation_date")}</th>*/}
                <th></th>
              </tr>
            </thead>
            <tbody>
              {userData.map((item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>
                    {item.first_name} {item.last_name}
                  </td>
                  <td>{item.role}</td>
                  <td>{item.created_at.toLocaleDateString()}</td>
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
        </Sheet>
      </div>
    </div>
  );
};

export default UserList;
