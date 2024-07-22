import { Dispatch, ReactNode, SetStateAction } from "react";

import { ExtendedUser } from "./next-auth";
import { UseFormReturn } from "react-hook-form";
import { BestRateState } from "@prisma/client";

export interface LogoutProps {
    redirectTo?: string;
}

export interface LogoutButtonProps {
    children?: ReactNode;
}

export interface ErrorMessageProps {
    message?: string;
}

export interface CardWrapperProps {
    children?: ReactNode;
    headerLabel: string;
    backButtonLabel: string;
    backButtonHref: string;
}

export interface Property {
    id: string;
    name: string;
    shortName: string;
}

export interface PropertiesListContainerProps {
    user: ExtendedUser;
}

export type ExtendedProperty = Property & {
    bestRates: {
        updatedAt: Date;
    }[];
};

export interface PropertiesListProps {
    properties: ExtendedProperty[];
}

export interface AddPropertyProps {
    userProperties: ExtendedProperty[];
}

export interface PropertySelectorProps {
    form: UseFormReturn | any | undefined;
    properties: Property[];
    userProperties: ExtendedProperty[];
    disabled: boolean;
}

export interface PropertyFormProps {
    properties: Property[];
    userProperties: ExtendedProperty[];
}

export interface PropertyDetailPageProps {
    params: { shortname: string };
}

export type BestRate = {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    valueDates: Date[];
    state: BestRateState;
};

export type PropertyWithValueDates = Property & {
    bestRates: BestRate[];
};

export interface BestRatesViewProps {
    property: PropertyWithValueDates;
}

export interface BestRatesHeaderProps {
    propertyName: string;
}

export interface BestRateFormProps {
    propertyId: string;
    bestRate?: BestRate;
}

export interface BestRateStatusProps {
    bestRates: BestRate[];
    bestRateSelected?: BestRate,
    selectBestRate: Dispatch<SetStateAction<BestRate | undefined>>;
}

export interface PropertyCalendarProps {
    form: UseFormReturn<
        {
            valueDates: Date[];
            name: string;
        },
        any,
        undefined
    >;
    disabled: boolean;
}

export interface JsonDates {
    [key: string]: number[];
}
