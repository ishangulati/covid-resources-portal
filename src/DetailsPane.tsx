import { Icon, Label, Persona, PersonaSize } from "@fluentui/react";
import { ILead, IListingContact } from "./Models";
import { Image } from "@fluentui/react/lib/Image";
import { CATEGORIES, categoryMapping, CategoryType } from "./Utils";
import { WhatsAppChat } from "./WhatsAppChat";
import { Tweet } from "react-twitter-widgets";

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
          <ListCard key={cat} category={cat} contact={props.contact} />
        ))}
      </div>
      <hr />
      <Label title={"Resources:"} />
      {props.contact.leads?.slice(0, 10).map((lead: ILead) => (
        <Lead key={lead.leaduid} lead={lead} />
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
      <Label title={`Shared by: ${lead.sender}`} />
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
        <>
          <Tweet
            options={{ width: 300, height: 500 }}
            tweetId={(lead.link || "").substr(-19)}
          />
        </>
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
