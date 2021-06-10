import {
  DocumentCard,
  DocumentCardLogo,
  DocumentCardTitle,
  Label,
  Persona,
  PersonaSize,
} from "@fluentui/react";
import { ILead, IListingContact } from "./Models";
import { Image } from "@fluentui/react/lib/Image";
import { CATEGORIES, categoryMapping, CategoryType } from "./Utils";

export function DetailsPane(props: { contact: IListingContact }) {
  return (
    <div style={{ width: "auto", position: "fixed", left: 520 }}>
      <Persona
        showUnknownPersonaCoin={true}
        text={props.contact.contactuid}
        secondaryText={props.contact.type.toUpperCase()}
        tertiaryText="Unverified contact"
        size={PersonaSize.size72}
      />
      <hr />
      <Label title={"Resources:"} />
      {CATEGORIES.map((cat) => (
        <ListCard category={cat} contact={props.contact} />
      ))}
      <hr />
      <Label title={"Resources:"} />
      {props.contact.leads?.map((lead: ILead) => (
        <Lead lead={lead} />
      ))}
    </div>
  );
}

function ListCard(props: { category: CategoryType; contact: any }) {
  const { category, contact } = props;

  return contact[category].length > 0 ? (
    <DocumentCard>
      <DocumentCardLogo
        logoIcon={categoryMapping[category].logoIcon}
        // styles={{ color: categoryMapping[category].color }}
      />
      <div>
        <DocumentCardTitle
          title={categoryMapping[category].text}
          shouldTruncate
        />
        <ul>
          {contact?.[category]?.map((item: string) => (
            <li>{item}</li>
          ))}
        </ul>
      </div>
    </DocumentCard>
  ) : null;
}

function Lead(props: { lead: ILead }) {
  return (
    <>
      <Label title={`Shared by: ${props.lead.sender}`} />
      {props.lead.link && props.lead.source === "whatsapp" ? (
        <Image src={`${props.lead.link}`} />
      ) : (
        JSON.parse(props.lead.rawdata || "{}").message
      )}
    </>
  );
}
