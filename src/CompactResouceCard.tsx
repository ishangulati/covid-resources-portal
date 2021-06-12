import * as React from "react";
import {
  DocumentCard,
  DocumentCardActivity,
  DocumentCardDetails,
  DocumentCardTitle,
  IDocumentCardActivityPerson,
  DocumentCardType,
  DocumentCardStatus,
  DocumentCardLogo,
} from "@fluentui/react/lib/DocumentCard";
import { IListingContact } from "./Models";
import {
  getIconsAndTextObject,
  getLogoProps,
  timeDifference,
  toTitleCase,
} from "./Utils";
import { setFocusVisibility } from "@fluentui/react";

export const ResourceCardCompact: React.FunctionComponent<{
  resource: IListingContact;
}> = (props) => {
  const { resource } = props;

  const leads: IDocumentCardActivityPerson[] =
    resource.leads?.map((l) => ({
      name: l.sender,
      profileImageSrc: "",
    })) || [];

  const resourceDetails = getIconsAndTextObject(resource);

  return (
    <DocumentCard
      onClick={(ev) => {
        setFocusVisibility(true);
      }}
      type={DocumentCardType.compact}
      style={{ height: 160, overflow: "hidden" }}
    >
      <div style={{ position: "relative", width: 150, overflow: "hidden" }}>
        <a
          data-is-focusable={false}
          style={{
            fontSize: 15,
            fontWeight: 600,
            color: `rgb(0, 120, 212)`,
            display: "inline-block",
            padding: "8px 16px",
            textDecoration: "none",
            wordBreak:"break-word"
          }}
          href={
            resource.contactuid[0] === "+"
              ? `tel://${resource.contactuid}`
              : resource.contactuid
          }
        >
          {resource.contactuid}
        </a>
        <div style={{ position: "absolute", margin: "0 20px" }}>
          {resourceDetails.icons.map((icon, i) => (
            <DocumentCardLogo key={i} {...getLogoProps(icon)} />
          ))}
        </div>
      </div>

      <DocumentCardDetails>
        <DocumentCardTitle
          title={`${resource.type.toUpperCase()}: ${resourceDetails.text
            .map(toTitleCase)
            .join(", ")}`}
          shouldTruncate
          showAsSecondaryTitle
          styles={{
            root: { textTransform: "Capitalize", fontWeight: "bold" },
          }}
        ></DocumentCardTitle>
        <DocumentCardStatus
          statusIcon="MapPin"
          styles={{
            root: {
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            },
          }}
          status={resource.location?.map(toTitleCase).join(", ") || ""}
        />
        <DocumentCardActivity
          activity={`Last shared: ${timeDifference(
            new Date().getTime(),
            new Date(resource.lastShared).getTime()
          )}`}
          people={leads}
        />
      </DocumentCardDetails>
    </DocumentCard>
  );
};
