import * as React from "react";
import {
  DocumentCard,
  DocumentCardActivity,
  DocumentCardDetails,
  DocumentCardTitle,
  IDocumentCardActivityPerson,
  DocumentCardType,
  DocumentCardStatus,
  DocumentCardLocation,
  DocumentCardLogo,
} from "@fluentui/react/lib/DocumentCard";
import { IListingContact } from "./Models";
import {
  getIconsAndTextObject,
  getLogoProps,
  timeDifference,
  toTitleCase,
} from "./Utils";

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
     // onClickHref={`/details/${resource.contactuid}`}
      type={DocumentCardType.compact}
      style={{ height: 160 }}
    >
      <div style={{ position: "relative" }}>
        <DocumentCardLocation
          styles={{ root: { fontSize: 15, display: "inline-block" } }}
          location={resource.contactuid}
          locationHref={`tel://${resource.contactuid}`}
        />
        <div style={{ position: "absolute", margin: "0 20px" }}>
          {resourceDetails.icons.map((icon) => (
            <DocumentCardLogo {...getLogoProps(icon)} />
          ))}
          {resource.location?.map((city) => (
            <div style={{ fontSize: 15 }}>{toTitleCase(city)}</div>
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
          statusIcon="attach"
          status={`This contact was shared ${resource.leads?.length} time(s)!`}
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
