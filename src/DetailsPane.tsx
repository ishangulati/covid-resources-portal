import { Icon, Persona, PersonaSize } from "@fluentui/react";
import { ILead, IListingContact } from "./Models";
import { Image } from "@fluentui/react/lib/Image";
import { CATEGORIES, categoryMapping, CategoryType, toTitleCase } from "./Utils";
import { WhatsAppChat } from "./WhatsAppChat";
import { Tweet } from "react-twitter-widgets";

export function DetailsPane(props: { contact: IListingContact }) {
  return (
    <div style={{overflowY: "auto", height: "100%" }}>
      <Persona
        text={props.contact.contactuid}
        secondaryText={props.contact.type.toUpperCase()}
        tertiaryText={`${props.contact.leads?.length} people shared this!`}
        imageInitials={props.contact.type[0].toUpperCase()}
        size={PersonaSize.size72}
        style={{color:"blue"}}
      />
      <hr />
      {props.contact.location?.map(toTitleCase).join(", ") || ""}
      <hr/>
      <div style={{ display: "flex" }}>
        {CATEGORIES.map((cat) => (
          <ListCard key={cat} category={cat} contact={props.contact} />
        ))}
      </div>
      <hr />
      <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
        {props.contact.leads
          ?.sort(
            (a, b) =>
              new Date(b.originTimestamp).getTime() -
              new Date(a.originTimestamp).getTime()
          )
          .slice(0, 30)
          .map((lead: ILead) => (
            <Lead key={lead.leaduid} lead={lead} />
          ))}
      </div>
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
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  ) : null;
}

function Lead(props: { lead: ILead }) {
  const { lead } = props;
  return (
    <>
      {lead.source === "whatsapp" ? (
        lead.link ? (
          <Image
            src={`https://covidresourcesstore.blob.core.windows.net/files/${lead.link}.jpeg`}
            width={300}
            height={400}
          />
        ) : (
          <WhatsAppChat
            sender={normalizeContact(lead.sender.split("@")[0])}
            text={JSON.parse(props.lead.rawdata || "{}").message}
            time={lead.originTimestamp.toString()}
          />
        )
      ) : (
        <div style={{ margin: 10, display: "inline-block", width: 320 }}>
          <Tweet tweetId={(lead.link || "").substr(-19)} />
        </div>
      )}
    </>
  );
}

function normalizeContact(phoneNumber: string) {
  let normalizedContact = phoneNumber.replace(/[^0-9.]/g, "");
  // helpline number
  if (
    normalizedContact.startsWith("1") &&
    // numbers like 100, 1075, 1800 209 2359
    ((normalizeContact.length >= 3 && normalizeContact.length < 6) ||
      normalizeContact.length === 11)
  ) {
    //do nothing
  } else {
    const number = normalizedContact.substr(-10);
    if (number) normalizedContact = "+91" + number;
  }

  return normalizedContact;
}
