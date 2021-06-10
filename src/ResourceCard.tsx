import {
  DocumentCard,
  DocumentCardActivity,
  DocumentCardLogo,
  DocumentCardStatus,
  DocumentCardTitle,
  IDocumentCardActivityPerson,
  IDocumentCardStyles,
} from "@fluentui/react";
import React from "react";
import { IListingContact } from "./Models";
import { getIconsAndTextObject, getLogoProps, toTitleCase, timeDifference } from "./Utils";



const DocumentCardConversationExample: React.FunctionComponent<{
  resource: IListingContact;
}> = (props) => {
  const { resource } = props;
  const cardStyles: IDocumentCardStyles = {
    root: { display: "inline-block", margin: 20, width: 320 },
  };

  const leads: IDocumentCardActivityPerson[] =
    resource.leads?.map((l) => ({
      name: l.sender,
      profileImageSrc: "",
    })) || [];

  const resourceDetails = getIconsAndTextObject(resource);

  return (
    <div>
      <DocumentCard
        styles={cardStyles}
        onClickHref={`/details/${resource.contactuid}`}
      >
        {resourceDetails.icons.map((icon) => (
          <DocumentCardLogo {...getLogoProps(icon)} />
        ))}
        <div style={{ marginLeft: 20 }}>
          <a href={`tel://${resource.contactuid}`}>{resource.contactuid}</a>
        </div>
        <div>
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
        </div>
        <DocumentCardActivity
          activity={`Last shared: ${timeDifference(
            new Date().getTime(),
            new Date(resource.lastShared).getTime()
          )}`}
          people={leads}
        />
      </DocumentCard>
    </div>
  );
};

export default DocumentCardConversationExample;
