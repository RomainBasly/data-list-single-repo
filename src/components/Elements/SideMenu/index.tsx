"use client";
import * as React from "react";
import { useEffect } from "react";
import classes from "./classes.module.scss";
import UserMenuStatus, { EOpeningState } from "@/Stores/UserMenuStatus";
import { HomeIcon, PencilIcon, XCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import NavLink from "@/components/Materials/NavLink";

type IProps = {
  status?: EOpeningState;
};

export default function SideMenu(props: IProps) {
  const [openingState, setOpeningState] = React.useState<EOpeningState>(
    UserMenuStatus.getInstance().status
  );

  useEffect(() => {
    const removeOnStatusChange = UserMenuStatus.getInstance().onChange(
      userMenuStatusChangeListener
    );
    return () => {
      removeOnStatusChange();
    };
  }, [updateStatus, openingState, props]);

  function userMenuStatusChangeListener() {
    setOpeningState(UserMenuStatus.getInstance().status);
  }

  function updateStatus() {
    UserMenuStatus.getInstance().toggle();
  }

  function close() {
    UserMenuStatus.getInstance().toggle();
  }

  const rootProps = { status: openingState };
  return (
    <div className={classes["root"]} {...rootProps}>
      <XMarkIcon className={classes["closing-svg"]} onClick={close} />
      <div className={classes["nav-link-container"]}>
        <NavLink
          svg={<HomeIcon />}
          className={classes["nav-link"]}
          text={"Home"}
          alt={"Home Icon"}
        />
        <NavLink
          svg={<PencilIcon />}
          className={classes["nav-link"]}
          text={"Créer une liste"}
          alt={"Add a list Icon"}
        />
        <NavLink
          svg={<XCircleIcon />}
          className={classes["nav-link"]}
          text={"Effacer une liste"}
          alt={"Add a list Icon"}
        />
      </div>
    </div>
  );
}
