import { IDocumentCardLogoProps } from "@fluentui/react";
import { IExtractedArrays } from "./Models";

interface IconType {
  logoIcon: string;
  color: string;
}

export function timeDifference(current: number, previous: number) {
  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;

  var elapsed = current - previous;

  if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000) + " seconds ago";
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + " minutes ago";
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + " hours ago";
  } else if (elapsed < msPerMonth) {
    return Math.round(elapsed / msPerDay) + " days ago";
  } else if (elapsed < msPerYear) {
    return Math.round(elapsed / msPerMonth) + " months ago";
  } else {
    return Math.round(elapsed / msPerYear) + " years ago";
  }
}

export function getIconsAndTextObject(resource: IExtractedArrays) {
  let text: string[] = [];
  let icons: IconType[] = [];

  CATEGORIES.forEach((cat) => {
    if (resource[cat] && resource[cat]?.length) {
      text.push((resource[cat] || []).join(", "));
      icons.push(categoryMapping[cat]);
    }
  });

  return {
    text,
    icons,
  };
}

export function toTitleCase(str: string) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

export function getLogoProps(iconType: IconType): IDocumentCardLogoProps {
  return {
    styles: {
      root: {
        fontSize: 20,
        padding: 5,
        display: "inline-block",
        color: iconType.color,
      },
    },
    logoIcon: iconType.logoIcon,
  };
}

export const categoryMapping: {
  [name in CategoryType]: { text: string; color: string; logoIcon: string };
} = {
  medicine: {
    text: "Medicine",
    color: "black",
    logoIcon: "Hospital",
  },
  bloodgroup: { text: "Blood Group", color: "red", logoIcon: "Drop" },
  therapy: { text: "Therapy", color: "orange", logoIcon: "Health" },
  vaccine: { text: "Vaccine", color: "green", logoIcon: "ShieldSolid" },
  oxygen: { text: "Oxygen Supplies", color: "blue", logoIcon: "SpeedHigh" },
  bed: { text: "Beds", color: "black", logoIcon: "Hotel" },
  ambulance: {
    text: "Ambulance",
    color: "black",
    logoIcon: "ParkingLocationMirrored",
  },
  food: { text: "Food", color: "green", logoIcon: "Breakfast" },
};

export function getEnumValues(obj: Object) {
  return Object.values(obj).map((k) => ({ key: k, text: k }));
}

export const CATEGORIES: CategoryType[] = [
  "medicine",
  "bloodgroup",
  "vaccine",
  "therapy",
  "oxygen",
  "bed",
  "ambulance",
  "food",
];

export type CategoryType =
  | "medicine"
  | "bloodgroup"
  | "therapy"
  | "vaccine"
  | "oxygen"
  | "bed"
  | "ambulance"
  | "food";
