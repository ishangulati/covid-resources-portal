import { Icon, Label, Persona, PersonaSize } from "@fluentui/react";
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
      <div style={{ display: "flex" }}>
        {CATEGORIES.map((cat) => (
          <ListCard category={cat} contact={props.contact} />
        ))}
      </div>
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
    <div style={{ width: 200, padding: 10 }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Icon
          iconName={categoryMapping[category].logoIcon}
          style={{ fontSize: 25, color: categoryMapping[category].color }}
        />
        <h3 style={{ display: "inline-block", margin: "0 5px" }}>
          {categoryMapping[category].text}
        </h3>
      </div>
      <ul style={{ paddingLeft: 25 }}>
        {contact?.[category]?.map((item: string) => (
          <li>{item}</li>
        ))}
      </ul>
    </div>
  ) : null;
}

function Lead(props: { lead: ILead }) {
  return (
    <>
      <Label title={`Shared by: ${props.lead.sender}`} />
      <pre style={{ margin: 10 }}>{JSON.stringify(props.lead, null, 4)}</pre>
      {props.lead.link && props.lead.source === "whatsapp" ? (
        <Image src={`${props.lead.link}`} />
      ) : (
        JSON.parse(props.lead.rawdata || "{}").message
      )}
    </>
  );
}
