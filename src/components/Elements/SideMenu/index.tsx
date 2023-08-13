'use client';
import * as React from "react";
import { useEffect } from "react";
import classes from "./classes.module.scss";
import {XMarkIcon} from "@heroicons/react/24/outline";
import UserMenuStatus, { EOpeningState } from "@/Stores/UserMenuStatus";

type IProps = {
    status?: EOpeningState;
}

export default function SideMenu(props: IProps) {
    const [openingState, setOpeningState] = React.useState<EOpeningState>(UserMenuStatus.getInstance().status);

    useEffect(() => {
		const removeOnStatusChange = UserMenuStatus.getInstance().onChange(userMenuStatusChangeListener);
		return () => {
			removeOnStatusChange();
		};
	}, [updateStatus, openingState, props]);

    function userMenuStatusChangeListener() {
		setOpeningState(UserMenuStatus.getInstance().status);
	};

    function updateStatus() {
        UserMenuStatus.getInstance().toggle();
    }

    function close() {
        UserMenuStatus.getInstance().toggle();
    }

    const rootProps = {status: openingState};
    return (
        <div className={classes["root"]} {...rootProps} >
            <XMarkIcon className={classes["svg"]} onClick={close}/>
        </div>
    )
}
