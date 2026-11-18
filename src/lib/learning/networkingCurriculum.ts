/**
 * MSP networking curriculum: the ten topics that follow subnetting.
 *
 * One canonical, dependency-free source shared by the Parris Tech learning
 * apps. Each app adapts this data to its own module format; edit the content
 * here and copy the file, rather than editing per-app copies.
 *
 * Source URLs were checked to resolve on SOURCES_VERIFIED_AT.
 */

export const NETWORKING_CURRICULUM_VERSION = "2026-10-19";
export const SOURCES_VERIFIED_AT = "2026-10-19T00:00:00Z";

export interface NetSource {
  title: string;
  url: string;
  supports: string[];
}

export interface NetQuizQuestion {
  id: string;
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export interface NetScenarioOption {
  text: string;
  correct: boolean;
  feedback: string;
}

/** Steps run in order; choosing the correct option moves to the next step. */
export interface NetScenarioStep {
  id: string;
  prompt: string;
  options: NetScenarioOption[];
}

export interface NetScenario {
  id: string;
  title: string;
  ticket: {
    requester: string;
    client: string;
    priority: "Low" | "Medium" | "High";
    summary: string;
    symptoms: string[];
    environment: string[];
    recentChanges: string[];
  };
  steps: NetScenarioStep[];
  resolution: string;
  ticketNote: string;
}

export interface NetModule {
  id: string;
  order: number;
  title: string;
  shortTitle: string;
  summary: string;
  whyItMatters: string;
  prerequisites: string[];
  objectives: string[];
  sections: { id: string; title: string; body: string }[];
  keyTerms: { term: string; definition: string }[];
  commands: { command: string; purpose: string }[];
  commonMistakes: string[];
  flashcards: { id: string; front: string; back: string }[];
  quiz: NetQuizQuestion[];
  scenario: NetScenario;
  sources: NetSource[];
}

export const networkingCurriculum: NetModule[] = [
  // 1 ─────────────────────────────────────────────────────────────── DHCP
  {
    id: "net-dhcp",
    order: 1,
    title: "DHCP in Depth",
    shortTitle: "DHCP",
    summary: "How devices get an IP address automatically, and how to fix it when they can't.",
    whyItMatters:
      "\"I can't get on the network\" is one of the most common MSP tickets. A device with a 169.254.x.x address, a full scope or a rogue DHCP server is fixable in minutes once you understand how leases work.",
    prerequisites: ["Subnetting basics"],
    objectives: [
      "Explain the four-step DORA exchange and which ports it uses.",
      "Configure scopes, exclusions and reservations sensibly.",
      "Recognise APIPA, scope exhaustion and rogue DHCP from the symptoms.",
      "Explain why DHCP needs a relay to serve other VLANs.",
    ],
    sections: [
      {
        id: "dhcp-dora",
        title: "How a device gets an address (DORA)",
        body:
          "When a device joins a network with no address it broadcasts for help, because it doesn't yet know who the DHCP server is.\n\n1. **Discover**: the client broadcasts \"is there a DHCP server?\" from UDP port 68 to port 67.\n2. **Offer**: a server offers an address plus options (gateway, DNS, lease time).\n3. **Request**: the client asks for the offered address. This is still a broadcast, so other servers know their offers weren't taken.\n4. **Acknowledge**: the server confirms and the lease starts.\n\nA lease isn't permanent. The client tries to **renew at 50%** of the lease time (T1) directly with its server, and if that fails it broadcasts to **any** server at **87.5%** (T2). Windows Server's default lease is 8 days.",
      },
      {
        id: "dhcp-scopes",
        title: "Scopes, exclusions, reservations and options",
        body:
          "- **Scope**: the range of addresses a server hands out for one subnet, e.g. 192.168.10.100–192.168.10.200.\n- **Exclusion**: addresses inside the scope that must never be handed out (e.g. printers or switches set with static IPs).\n- **Reservation**: always gives the same address to one device, matched by its MAC address. Use this for printers and NAS boxes rather than static IPs, so the address is still documented in one place.\n- **Options**: extra settings sent with the lease. The important ones are **3 (Router / default gateway)**, **6 (DNS servers)**, **15 (DNS domain name)** and **51 (lease time)**. PXE booting uses 66/67.\n\nGood practice: keep static devices outside the scope (or excluded), give guest networks short leases (hours, not days), and document every reservation.",
      },
      {
        id: "dhcp-failures",
        title: "What failure looks like",
        body:
          "- **169.254.x.x (APIPA)**: Windows couldn't reach any DHCP server, so it gave itself a link-local address. The device can only talk to other APIPA devices. Check the cable or Wi-Fi first, then the switch port's VLAN, then whether the DHCP service and relay are working.\n- **Scope exhaustion**: every address is leased. New devices get APIPA while existing ones still work. Common on guest Wi-Fi with long leases, or after a subnet fills up. Fix by shortening leases, removing stale leases or enlarging the subnet.\n- **Rogue DHCP**: a second DHCP server (often a consumer router someone plugged in backwards) hands out wrong addresses, so some users get a 192.168.0.x or 192.168.1.x address and a gateway that goes nowhere. Find it with `ipconfig /all` (look at \"DHCP Server\") and fix it properly with **DHCP snooping** on managed switches.\n- **Duplicate address**: usually a device set with a static IP inside the scope.",
      },
      {
        id: "dhcp-relay",
        title: "DHCP across VLANs: relays",
        body:
          "DHCP Discover is a broadcast, and **routers don't forward broadcasts**. If the DHCP server lives in VLAN 10 and clients sit in VLAN 20, the VLAN 20 gateway must run a **DHCP relay** (Cisco calls it `ip helper-address`). The relay turns the broadcast into a unicast to the server and fills in the **giaddr** field, which tells the server which scope to use.\n\nIf a new VLAN gets APIPA addresses but everything else works, the relay (or the matching scope) is usually what's missing.",
      },
    ],
    keyTerms: [
      { term: "DORA", definition: "Discover, Offer, Request, Acknowledge: the four messages of a DHCP lease." },
      { term: "Lease", definition: "A time-limited loan of an IP address. Clients renew at 50% (T1) and rebind at 87.5% (T2)." },
      { term: "Reservation", definition: "A rule that always gives the same IP address to a specific MAC address." },
      { term: "Exclusion", definition: "Addresses inside a scope that the server will never hand out." },
      { term: "APIPA", definition: "Automatic Private IP Addressing: a 169.254.0.0/16 address a device gives itself when no DHCP server answers." },
      { term: "DHCP relay", definition: "A router/switch feature that forwards DHCP broadcasts from one subnet to a DHCP server in another." },
      { term: "DHCP snooping", definition: "A managed-switch feature that only allows DHCP offers from trusted ports, blocking rogue servers." },
    ],
    commands: [
      { command: "ipconfig /all", purpose: "Show the address, gateway, DNS servers, lease times and which DHCP server answered." },
      { command: "ipconfig /release && ipconfig /renew", purpose: "Give up the current lease and request a new one." },
      { command: "Get-DhcpServerv4ScopeStatistics", purpose: "On a Windows DHCP server, show how full each scope is." },
      { command: "Get-DhcpServerv4Lease -ScopeId 192.168.10.0", purpose: "List current leases in a scope." },
    ],
    commonMistakes: [
      "Setting a printer to a static IP inside the DHCP scope without an exclusion, causing duplicate addresses later.",
      "Using 8-day leases on a busy guest network so the scope fills with devices that left days ago.",
      "Creating a new VLAN and scope but forgetting the DHCP relay on the VLAN's gateway.",
      "Treating a 169.254.x.x address as a DNS or internet problem instead of a 'never got an address' problem.",
    ],
    flashcards: [
      { id: "dhcp-fc-1", front: "What do the letters in DORA stand for?", back: "Discover, Offer, Request, Acknowledge." },
      { id: "dhcp-fc-2", front: "Which UDP ports does DHCP use?", back: "67 on the server and 68 on the client." },
      { id: "dhcp-fc-3", front: "What does a 169.254.x.x address on Windows tell you?", back: "No DHCP server answered, so the device gave itself an APIPA (link-local) address." },
      { id: "dhcp-fc-4", front: "Which DHCP option sets the default gateway?", back: "Option 3 (Router). Option 6 sets DNS servers." },
      { id: "dhcp-fc-5", front: "Why do clients in another VLAN need a DHCP relay?", back: "DHCP Discover is a broadcast and routers don't forward broadcasts. The relay forwards it as unicast to the server." },
      { id: "dhcp-fc-6", front: "When does a client first try to renew its lease?", back: "At 50% of the lease time (T1), directly with the server that issued it." },
      { id: "dhcp-fc-7", front: "Reservation or static IP for a printer?", back: "Usually a DHCP reservation: the address stays fixed but is documented and managed centrally." },
    ],
    quiz: [
      {
        id: "dhcp-q1",
        question: "A laptop shows 169.254.23.7 and can't reach anything. Other users are fine. What is the most likely cause?",
        options: [
          "The DNS server is down",
          "The laptop never received a DHCP lease",
          "The default gateway is wrong",
          "The internet connection is down",
        ],
        answerIndex: 1,
        explanation: "169.254.x.x is APIPA: Windows assigns it only when no DHCP server answers. DNS, gateway and internet problems all happen after a device has a proper address.",
      },
      {
        id: "dhcp-q2",
        question: "Which DHCP message does the client broadcast first?",
        options: ["Offer", "Request", "Discover", "Acknowledge"],
        answerIndex: 2,
        explanation: "The client doesn't know where the server is yet, so it broadcasts a Discover.",
      },
      {
        id: "dhcp-q3",
        question: "New guests on the café Wi-Fi get no address after lunch, but people connected in the morning still work. What should you check first?",
        options: [
          "Whether the DHCP scope is exhausted",
          "Whether the DNS forwarders are correct",
          "Whether SPF is configured",
          "Whether the switch needs a firmware update",
        ],
        answerIndex: 0,
        explanation: "Existing leases keep working while new devices fail: that's the classic sign of a full scope. Shorter guest leases or a bigger subnet fix it.",
      },
      {
        id: "dhcp-q4",
        question: "Several users suddenly have 192.168.0.x addresses on a network that uses 10.20.0.0/24. What's the likely cause?",
        options: [
          "Scope exhaustion",
          "A rogue DHCP server, such as a home router plugged in",
          "An expired SSL certificate",
          "A DNS cache problem",
        ],
        answerIndex: 1,
        explanation: "Addresses from the wrong range point to a second DHCP server answering first. `ipconfig /all` shows which server issued the lease; DHCP snooping prevents it.",
      },
      {
        id: "dhcp-q5",
        question: "A new VLAN 30 was created with its own scope on the Windows DHCP server, but clients in VLAN 30 get APIPA addresses. What is most likely missing?",
        options: [
          "A DNS A record for the DHCP server",
          "A DHCP relay (IP helper) on the VLAN 30 gateway",
          "A reservation for each client",
          "Port 443 open on the firewall",
        ],
        answerIndex: 1,
        explanation: "Broadcasts don't cross routers. The VLAN 30 gateway must relay DHCP to the server, which then picks the scope from the giaddr field.",
      },
      {
        id: "dhcp-q6",
        question: "Which option would you change so DHCP clients use the domain controllers for DNS?",
        options: ["Option 3", "Option 6", "Option 51", "Option 66"],
        answerIndex: 1,
        explanation: "Option 6 lists DNS servers. Option 3 is the gateway, 51 is lease time and 66 is a PXE boot server.",
      },
    ],
    scenario: {
      id: "dhcp-scenario-new-staff",
      title: "Half the office can't connect",
      ticket: {
        requester: "Office manager",
        client: "Small accounting practice",
        priority: "High",
        summary: "Some staff can't get on the network since this morning; others are fine.",
        symptoms: [
          "Three PCs show 'No internet' and an address of 192.168.1.47, 192.168.1.52 and 192.168.1.60.",
          "The office normally uses 10.0.10.0/24 with the firewall at 10.0.10.1.",
          "Staff who came in early are working normally.",
        ],
        environment: ["Windows Server DHCP", "Managed switches", "One flat office VLAN"],
        recentChanges: ["A staff member brought in a spare Wi-Fi router for the meeting room yesterday."],
      },
      steps: [
        {
          id: "dhcp-s1",
          prompt: "What do you check first on an affected PC?",
          options: [
            { text: "Run `ipconfig /all` and look at the DHCP Server and Default Gateway lines.", correct: true, feedback: "Right. The wrong address range already hints at a second DHCP server, and ipconfig /all tells you exactly which server issued the lease." },
            { text: "Flush the DNS cache.", correct: false, feedback: "The address is in the wrong subnet entirely, so DNS isn't the problem yet." },
            { text: "Restart the Windows DHCP server.", correct: false, feedback: "The Windows server may be fine; something else is answering first. Restarting it changes nothing and interrupts working users." },
          ],
        },
        {
          id: "dhcp-s2",
          prompt: "ipconfig shows DHCP Server 192.168.1.1, which isn't any of your equipment. What next?",
          options: [
            { text: "Find the device at 192.168.1.1 (check the switch MAC table for its MAC address), unplug it or move its cable to a WAN port, then renew the affected PCs' leases.", correct: true, feedback: "Correct. Remove the rogue server, then `ipconfig /release` and `/renew` on the affected PCs." },
            { text: "Add a reservation for each affected PC on the Windows server.", correct: false, feedback: "Reservations don't help if the rogue server answers first." },
            { text: "Change the office to the 192.168.1.0/24 range.", correct: false, feedback: "Never redesign the network around a rogue device." },
          ],
        },
        {
          id: "dhcp-s3",
          prompt: "The meeting-room router was plugged in LAN-port first. How do you stop this happening again?",
          options: [
            { text: "Enable DHCP snooping on the managed switches, trusting only the uplink to the real DHCP server.", correct: true, feedback: "Yes. DHCP snooping drops offers from untrusted ports, so a rogue router can't hand out addresses." },
            { text: "Tell staff not to bring in routers and close the ticket.", correct: false, feedback: "Worth saying, but it isn't a technical control. Snooping actually prevents it." },
            { text: "Shorten the lease time to one hour.", correct: false, feedback: "Shorter leases don't stop a rogue server answering first." },
          ],
        },
      ],
      resolution: "A consumer router plugged in LAN-first was acting as a rogue DHCP server. It was removed, affected PCs renewed their leases, and DHCP snooping was enabled with only the server uplink trusted.",
      ticketNote: "Cause: rogue DHCP (consumer router at 192.168.1.1, meeting room port Gi1/0/14). Removed device; ipconfig /release /renew on 3 PCs, all now 10.0.10.x. Enabled DHCP snooping, trusted Gi1/0/48 uplink only. Advised staff.",
    },
    sources: [
      { title: "RFC 2131: Dynamic Host Configuration Protocol", url: "https://www.rfc-editor.org/rfc/rfc2131", supports: ["DORA exchange", "T1/T2 renewal timers", "giaddr relay field"] },
      { title: "RFC 3927: Dynamic Configuration of IPv4 Link-Local Addresses", url: "https://www.rfc-editor.org/rfc/rfc3927", supports: ["169.254.0.0/16 link-local (APIPA) addresses"] },
      { title: "Microsoft Learn: Dynamic Host Configuration Protocol (DHCP)", url: "https://learn.microsoft.com/en-us/windows-server/networking/technologies/dhcp/dhcp-top", supports: ["Windows Server DHCP scopes, options and reservations"] },
    ],
  },

  // 2 ──────────────────────────────────────────────────────────────── DNS
  {
    id: "net-dns",
    order: 2,
    title: "DNS for MSP Technicians",
    shortTitle: "DNS",
    summary: "How names become addresses, the records you'll edit, and the email records behind most delivery problems.",
    whyItMatters:
      "\"The internet is down\" is often really \"DNS is down\". DNS also decides where email goes and whether it's trusted, so a wrong MX or SPF record can stop a whole business's mail.",
    prerequisites: ["DHCP in Depth"],
    objectives: [
      "Explain recursive vs authoritative DNS and what a TTL does.",
      "Read and create A, AAAA, CNAME, MX, TXT, SRV, PTR and NS records.",
      "Explain SPF, DKIM and DMARC and diagnose a failing record.",
      "Use nslookup and Resolve-DnsName to test DNS deliberately.",
    ],
    sections: [
      {
        id: "dns-how",
        title: "How a lookup works",
        body:
          "Your PC asks its configured DNS server (a **recursive resolver**, for example the domain controller or the firewall). If the answer isn't cached, the resolver walks the tree: root servers → the .au servers → the servers for the domain, which give the **authoritative** answer.\n\nEvery answer has a **TTL** (time to live) in seconds, saying how long it may be cached. A record with a TTL of 3600 can take up to an hour to change everywhere. **Before a planned change (like a website or email migration), lower the TTL a day ahead.**\n\nDNS uses **port 53**, normally UDP, with TCP for large answers and zone transfers.",
      },
      {
        id: "dns-records",
        title: "The record types you'll actually use",
        body:
          "| Record | What it does | Example |\n|---|---|---|\n| **A** | Name → IPv4 address | www → 203.0.113.10 |\n| **AAAA** | Name → IPv6 address | www → 2001:db8::10 |\n| **CNAME** | Alias to another name | autodiscover → autodiscover.outlook.com |\n| **MX** | Where email for the domain is delivered (lower preference wins) | 0 contoso-com.mail.protection.outlook.com |\n| **TXT** | Free text, used for SPF, DMARC and domain verification | v=spf1 include:spf.protection.outlook.com -all |\n| **SRV** | Locates a service, e.g. domain controllers | _ldap._tcp.dc._msdcs.corp.example |\n| **PTR** | Reverse lookup: IP → name | 10.113.0.203.in-addr.arpa |\n| **NS** | Which servers are authoritative for the zone | ns1.registrar.example |\n\nA CNAME can't sit alongside other records with the same name, so you can't put a CNAME on the bare domain (the apex).",
      },
      {
        id: "dns-email",
        title: "Email authentication: SPF, DKIM and DMARC",
        body:
          "- **SPF** (a TXT record on the domain) lists which servers may send mail for it, e.g. `v=spf1 include:spf.protection.outlook.com -all`. There must be **only one** SPF record, and it may trigger at most **10 DNS lookups**; adding a newsletter service as a second SPF record breaks both.\n- **DKIM** signs each message with a private key; the public key is published in DNS under a selector. In Microsoft 365 you publish two CNAMEs (selector1._domainkey and selector2._domainkey) and then enable DKIM signing.\n- **DMARC** (a TXT record at _dmarc.domain) tells receivers what to do when SPF/DKIM don't line up with the From address: `p=none` (monitor), `p=quarantine` or `p=reject`, plus where to send reports (rua=).\n\nRoll DMARC out in stages: start at p=none, read the reports, fix every legitimate sender, then tighten.",
      },
      {
        id: "dns-split",
        title: "Internal vs external DNS (split-brain)",
        body:
          "Many businesses have **internal DNS** on their domain controllers and **external DNS** at the registrar or Cloudflare. If the same name exists in both (for example a company website hosted externally but with an internal zone of the same name), the internal zone must also contain that record or staff inside the office can't reach the website, while everyone outside can. That's a classic split-brain ticket.\n\nWhen testing, always say **which server** you're asking: `nslookup www.example.com 1.1.1.1` (public) vs `nslookup www.example.com 10.0.10.5` (internal).",
      },
    ],
    keyTerms: [
      { term: "Recursive resolver", definition: "The DNS server a client asks; it chases the answer and caches it." },
      { term: "Authoritative server", definition: "The server that holds the real records for a zone." },
      { term: "TTL", definition: "How many seconds an answer may be cached before it's looked up again." },
      { term: "MX preference", definition: "The priority number on an MX record. Lower numbers are tried first." },
      { term: "SPF", definition: "A TXT record listing which servers may send email for a domain." },
      { term: "DKIM", definition: "A cryptographic signature on outgoing email, checked against a public key in DNS." },
      { term: "DMARC", definition: "A policy telling receivers what to do with mail that fails SPF/DKIM alignment, and where to report." },
      { term: "Split-brain DNS", definition: "Different answers for the same name depending on whether you ask internal or external DNS." },
    ],
    commands: [
      { command: "nslookup example.com", purpose: "Look up a name using your configured DNS server." },
      { command: "nslookup -type=mx example.com 1.1.1.1", purpose: "Ask a specific public server for MX records." },
      { command: "Resolve-DnsName _dmarc.example.com -Type TXT", purpose: "PowerShell lookup of a DMARC record." },
      { command: "ipconfig /flushdns", purpose: "Clear the Windows DNS client cache." },
      { command: "ipconfig /displaydns", purpose: "Show what the PC has cached." },
    ],
    commonMistakes: [
      "Adding a second SPF record instead of merging the new sender into the existing one.",
      "Changing DNS records without lowering the TTL first, then wondering why it takes hours.",
      "Testing only from the office and missing that the public record is wrong (or the reverse).",
      "Jumping straight to DMARC p=reject and blocking legitimate invoices sent by a third-party system.",
      "Blaming DNS cache on the PC when the authoritative record itself is wrong.",
    ],
    flashcards: [
      { id: "dns-fc-1", front: "Which port does DNS use?", back: "53, normally UDP; TCP for large responses and zone transfers." },
      { id: "dns-fc-2", front: "What does an MX record do?", back: "Says which mail servers receive email for the domain; the lowest preference number is tried first." },
      { id: "dns-fc-3", front: "How many SPF records may a domain have?", back: "One. Merge additional senders into it (and stay under 10 DNS lookups)." },
      { id: "dns-fc-4", front: "Where does a DMARC record live?", back: "In a TXT record at _dmarc.<domain>." },
      { id: "dns-fc-5", front: "What does TTL control?", back: "How long resolvers may cache an answer before asking again." },
      { id: "dns-fc-6", front: "Which record type does reverse DNS use?", back: "PTR, under in-addr.arpa (IPv4) or ip6.arpa (IPv6)." },
      { id: "dns-fc-7", front: "Why can't you put a CNAME on the bare domain?", back: "A CNAME can't coexist with other records of the same name, and the apex must have SOA and NS records." },
    ],
    quiz: [
      {
        id: "dns-q1",
        question: "A client adds a marketing platform and creates a second TXT record starting with v=spf1. What happens?",
        options: [
          "Both records are combined automatically",
          "SPF evaluation fails because multiple SPF records are invalid",
          "Only the newest record is used",
          "Nothing, TXT records don't affect email",
        ],
        answerIndex: 1,
        explanation: "RFC 7208 treats more than one SPF record as a permanent error. Merge senders into a single record.",
      },
      {
        id: "dns-q2",
        question: "You'll move a website to a new host tomorrow. The A record has a TTL of 86400. What should you do today?",
        options: [
          "Delete the A record",
          "Lower the TTL (e.g. to 300) so the change propagates quickly tomorrow",
          "Raise the TTL so the record is cached longer",
          "Flush DNS on every PC",
        ],
        answerIndex: 1,
        explanation: "Resolvers cache the record for the old TTL. Lowering it a day ahead means tomorrow's change is picked up within minutes.",
      },
      {
        id: "dns-q3",
        question: "Staff in the office can't open the company website but it works on their phones over 4G. What's the most likely cause?",
        options: [
          "The website is down",
          "The internal DNS zone is missing the www record (split-brain)",
          "The MX record is wrong",
          "DHCP has run out of addresses",
        ],
        answerIndex: 1,
        explanation: "Working outside but not inside points to internal DNS giving a different (or no) answer for the same name.",
      },
      {
        id: "dns-q4",
        question: "Which record helps Windows clients find domain controllers?",
        options: ["MX", "PTR", "SRV", "AAAA"],
        answerIndex: 2,
        explanation: "Domain controllers register SRV records such as _ldap._tcp.dc._msdcs.<domain>.",
      },
      {
        id: "dns-q5",
        question: "What does DMARC p=none do?",
        options: [
          "Rejects all unauthenticated mail",
          "Sends failing mail to junk",
          "Takes no enforcement action but requests reports",
          "Disables SPF",
        ],
        answerIndex: 2,
        explanation: "p=none is monitoring mode: receivers still deliver failing mail but send aggregate reports, which you use before tightening the policy.",
      },
      {
        id: "dns-q6",
        question: "Which command asks Cloudflare's public resolver for a domain's MX records?",
        options: [
          "ipconfig /displaydns",
          "nslookup -type=mx example.com 1.1.1.1",
          "tracert example.com",
          "ping -t example.com",
        ],
        answerIndex: 1,
        explanation: "nslookup takes the record type and an optional server to ask. Asking a public resolver tests what the outside world sees.",
      },
    ],
    scenario: {
      id: "dns-scenario-invoices-junk",
      title: "Invoices going to customers' junk folders",
      ticket: {
        requester: "Accounts team lead",
        client: "Trades business on Microsoft 365",
        priority: "Medium",
        summary: "Customers say our invoices land in junk since we started using the new invoicing system.",
        symptoms: [
          "Invoices are sent by the cloud invoicing system 'as' accounts@client.com.au.",
          "Normal Outlook email from staff arrives fine.",
        ],
        environment: ["Microsoft 365 email", "DNS at the domain registrar", "DMARC record: p=quarantine"],
        recentChanges: ["Invoicing system set up last week by the bookkeeper."],
      },
      steps: [
        {
          id: "dns-s1",
          prompt: "What do you check first?",
          options: [
            { text: "Look up the domain's SPF and DMARC records, and check the message headers of a junked invoice for SPF/DKIM/DMARC results.", correct: true, feedback: "Correct. The headers show exactly which check failed, and the DNS records show why." },
            { text: "Ask customers to whitelist the address.", correct: false, feedback: "That hides the problem for a few customers and leaves the domain misconfigured." },
            { text: "Turn off DMARC.", correct: false, feedback: "Removing protection makes spoofing your client easier. Fix the authentication instead." },
          ],
        },
        {
          id: "dns-s2",
          prompt: "SPF is 'v=spf1 include:spf.protection.outlook.com -all'. The invoicing system's help docs give an include for their servers. What do you do?",
          options: [
            { text: "Add their include to the existing record: v=spf1 include:spf.protection.outlook.com include:<their spf> -all", correct: true, feedback: "Right. One SPF record, both senders included. Check the total stays within 10 DNS lookups." },
            { text: "Create a second SPF TXT record for the invoicing system.", correct: false, feedback: "Two SPF records cause a permanent error, which would break staff email too." },
            { text: "Change -all to +all so everything passes.", correct: false, feedback: "+all lets anyone send as your client. Never do this." },
          ],
        },
        {
          id: "dns-s3",
          prompt: "SPF now passes, but DMARC still fails for invoices. The headers show the envelope sender is the vendor's own domain. What's the best fix?",
          options: [
            { text: "Set up DKIM signing for the client's domain in the invoicing system (publish the CNAMEs/TXT they provide), so DKIM aligns with the From address.", correct: true, feedback: "Yes. DMARC needs SPF or DKIM to pass and align with the From domain. Custom DKIM gives alignment even when the envelope sender is the vendor's." },
            { text: "Lower DMARC to p=none permanently.", correct: false, feedback: "Fine as a temporary step while you fix it, but not as the fix." },
            { text: "Ask the vendor to change the MX record.", correct: false, feedback: "MX controls inbound mail, not outbound authentication." },
          ],
        },
      ],
      resolution: "The invoicing system wasn't authorised in SPF and wasn't DKIM-signing for the client's domain. Its include was merged into the single SPF record and custom DKIM was enabled, so invoices now pass DMARC.",
      ticketNote: "Cause: new invoicing platform not in SPF, no aligned DKIM, so DMARC p=quarantine sent invoices to junk. Merged include into existing SPF (7 lookups total). Published vendor DKIM CNAMEs, enabled custom DKIM. Test invoice headers: spf=pass dkim=pass dmarc=pass.",
    },
    sources: [
      { title: "RFC 1035: Domain Names, Implementation and Specification", url: "https://www.rfc-editor.org/rfc/rfc1035", supports: ["Record types", "TTL", "Port 53 over UDP and TCP"] },
      { title: "RFC 7208: Sender Policy Framework (SPF)", url: "https://www.rfc-editor.org/rfc/rfc7208", supports: ["One SPF record per domain", "10 DNS lookup limit"] },
      { title: "RFC 7489: DMARC", url: "https://www.rfc-editor.org/rfc/rfc7489", supports: ["_dmarc record", "p=none/quarantine/reject", "Alignment"] },
      { title: "Microsoft Learn: Email authentication in Microsoft 365", url: "https://learn.microsoft.com/en-us/defender-office-365/email-authentication-about", supports: ["SPF, DKIM and DMARC in Microsoft 365"] },
    ],
  },

  // 3 ───────────────────────────────────────────────────────────── VLANs
  {
    id: "net-vlans",
    order: 3,
    title: "VLANs and Switching",
    shortTitle: "VLANs",
    summary: "Splitting one physical network into separate ones, and keeping switches from melting down.",
    whyItMatters:
      "Almost every business network separates staff, voice, guest and camera traffic with VLANs. A wrong port VLAN or a looped cable can knock out a site, and both are very common.",
    prerequisites: ["Subnetting basics", "DHCP in Depth"],
    objectives: [
      "Explain what a VLAN is and why each one is usually its own subnet.",
      "Tell access ports from trunk ports and explain 802.1Q tagging.",
      "Explain how traffic moves between VLANs.",
      "Recognise a switching loop and explain how spanning tree prevents it.",
    ],
    sections: [
      {
        id: "vlan-what",
        title: "What a VLAN is",
        body:
          "A **VLAN** (virtual LAN) makes one switch behave like several separate switches. Devices in VLAN 10 can't see broadcasts from VLAN 20, and they can only talk to each other through a router or firewall, where you can apply rules.\n\nThe usual rule is **one VLAN = one subnet**, for example:\n\n| VLAN | Use | Subnet |\n|---|---|---|\n| 10 | Staff | 10.0.10.0/24 |\n| 20 | Voice (phones) | 10.0.20.0/24 |\n| 30 | Guest Wi-Fi | 10.0.30.0/24 |\n| 40 | CCTV / IoT | 10.0.40.0/24 |\n\nWhy bother? Security (guests can't reach the file server), performance (smaller broadcast domains) and quality (voice traffic can be prioritised).",
      },
      {
        id: "vlan-ports",
        title: "Access ports, trunk ports and 802.1Q",
        body:
          "- An **access port** belongs to one VLAN and sends untagged frames. PCs and printers plug into access ports.\n- A **trunk port** carries many VLANs over one cable between switches, firewalls and Wi-Fi access points. Each frame gets an **802.1Q tag**, a 4-byte header holding a 12-bit VLAN ID (usable IDs 1–4094).\n- The **native VLAN** is the one VLAN sent untagged on a trunk. Both ends must agree, otherwise traffic leaks between VLANs.\n- Many switches support a **voice VLAN**: the port is an access port for the PC's data VLAN but also carries tagged voice traffic for the IP phone the PC plugs through.\n\nA wrong access VLAN is a common cause of 'this one desk can't get an address': the PC ends up in a VLAN with no DHCP.",
      },
      {
        id: "vlan-routing",
        title: "Getting between VLANs",
        body:
          "Traffic between VLANs needs a Layer 3 device:\n\n- **Router-on-a-stick**: one trunk to a router or firewall with a sub-interface (and gateway IP) per VLAN. Common in small offices, where the firewall does the routing and enforces rules between VLANs.\n- **Layer 3 switch**: the switch has a virtual interface (SVI) per VLAN acting as each gateway. Faster, common in larger sites.\n\nEach VLAN's gateway also needs a **DHCP relay** if the DHCP server lives in another VLAN.",
      },
      {
        id: "vlan-stp",
        title: "Loops and spanning tree",
        body:
          "Ethernet frames have no 'time to live', so if two switch ports are cabled together (or two switches are joined twice) a broadcast circles forever and multiplies: a **broadcast storm**. The network grinds to a halt, switch lights flash solidly and everything drops.\n\n**Spanning Tree Protocol** (STP, and its faster successor RSTP) detects redundant paths and blocks one, unblocking it only if the main path fails. Good practice:\n\n- Leave STP enabled.\n- Enable **PortFast** (or 'edge port') on ports to end devices so they come up quickly, with **BPDU Guard** to shut the port if someone plugs a switch into it.\n- Check the switch's **MAC address table** to find which port a device is on.",
      },
    ],
    keyTerms: [
      { term: "VLAN", definition: "A logical network on shared switch hardware; its own broadcast domain, usually its own subnet." },
      { term: "Access port", definition: "A switch port in one VLAN, carrying untagged traffic to an end device." },
      { term: "Trunk port", definition: "A switch port carrying several VLANs, each frame identified by an 802.1Q tag." },
      { term: "802.1Q", definition: "The IEEE standard for VLAN tagging: a 4-byte tag with a 12-bit VLAN ID." },
      { term: "Native VLAN", definition: "The VLAN whose traffic crosses a trunk untagged; must match on both ends." },
      { term: "SVI", definition: "Switched virtual interface: a Layer 3 interface on a switch that acts as a VLAN's gateway." },
      { term: "Spanning Tree (STP/RSTP)", definition: "A protocol that blocks redundant switch paths to prevent loops." },
      { term: "BPDU Guard", definition: "Shuts down an edge port if a switch is connected to it, preventing accidental loops." },
    ],
    commands: [
      { command: "show vlan brief", purpose: "Cisco-style: list VLANs and which access ports belong to each." },
      { command: "show interfaces trunk", purpose: "Cisco-style: show trunk ports, allowed VLANs and the native VLAN." },
      { command: "show mac address-table address <mac>", purpose: "Find which switch port a device is plugged into." },
      { command: "show spanning-tree", purpose: "See which ports STP is blocking and which switch is root." },
    ],
    commonMistakes: [
      "Patching a desk into a port that's in the wrong VLAN, then troubleshooting DHCP or DNS for an hour.",
      "Adding a new VLAN to the switch but not allowing it on the trunk to the firewall or access point.",
      "Mismatched native VLANs on the two ends of a trunk.",
      "Disabling spanning tree to 'make ports come up faster' instead of using PortFast.",
      "Putting guest Wi-Fi in the staff VLAN 'just for now'.",
    ],
    flashcards: [
      { id: "vlan-fc-1", front: "Access port vs trunk port?", back: "Access: one VLAN, untagged, for end devices. Trunk: many VLANs, tagged with 802.1Q, between network devices." },
      { id: "vlan-fc-2", front: "How big is the VLAN ID field in an 802.1Q tag?", back: "12 bits; usable VLAN IDs are 1–4094." },
      { id: "vlan-fc-3", front: "What is the native VLAN?", back: "The VLAN carried untagged on a trunk. Both ends must match." },
      { id: "vlan-fc-4", front: "Can two VLANs talk without a router or Layer 3 switch?", back: "No. Traffic between VLANs must be routed, which is where firewall rules apply." },
      { id: "vlan-fc-5", front: "What causes a broadcast storm?", back: "A switching loop with no spanning tree to block the redundant path." },
      { id: "vlan-fc-6", front: "What does BPDU Guard do?", back: "Disables an edge port if it receives spanning-tree BPDUs, i.e. someone plugged a switch into it." },
    ],
    quiz: [
      {
        id: "vlan-q1",
        question: "One desk can't get an IP address, while the desks either side are fine. The cable tests OK. What should you check on the switch?",
        options: [
          "The port's access VLAN",
          "The DNS forwarders",
          "The SPF record",
          "The firewall's public IP",
        ],
        answerIndex: 0,
        explanation: "If the port is in a VLAN with no DHCP (or the wrong one), only that desk breaks. `show vlan brief` or the switch UI shows the port's VLAN.",
      },
      {
        id: "vlan-q2",
        question: "You created VLAN 50 for cameras and set the camera ports, but cameras get no address. The firewall has a VLAN 50 interface with DHCP. What's most likely missing?",
        options: [
          "A PTR record for each camera",
          "VLAN 50 allowed on the trunk between the switch and the firewall",
          "Port forwarding for 554",
          "A Wi-Fi channel change",
        ],
        answerIndex: 1,
        explanation: "Trunks often carry only an allowed list of VLANs. If VLAN 50 isn't allowed on the uplink, its traffic never reaches the firewall.",
      },
      {
        id: "vlan-q3",
        question: "After someone tidied the comms cabinet, the whole office network became unusable and the switch lights flash constantly. What is the likely cause?",
        options: [
          "DHCP scope exhaustion",
          "A switching loop causing a broadcast storm",
          "An expired DKIM key",
          "The ISP link is down",
        ],
        answerIndex: 1,
        explanation: "A loop (a cable connecting two ports, or two switch-to-switch links) without spanning tree causes a broadcast storm that saturates every port.",
      },
      {
        id: "vlan-q4",
        question: "What does an 802.1Q tag add to a frame?",
        options: [
          "A 12-bit VLAN ID (inside a 4-byte tag)",
          "A new destination IP address",
          "Encryption",
          "A DNS name",
        ],
        answerIndex: 0,
        explanation: "802.1Q inserts a 4-byte tag carrying priority bits and the 12-bit VLAN ID.",
      },
      {
        id: "vlan-q5",
        question: "In a small office, where do inter-VLAN firewall rules usually get applied?",
        options: [
          "On each PC",
          "On the firewall/router acting as each VLAN's gateway",
          "In DNS",
          "On the Wi-Fi access points only",
        ],
        answerIndex: 1,
        explanation: "With router-on-a-stick, the firewall holds each VLAN's gateway, so traffic between VLANs passes through its rules.",
      },
    ],
    scenario: {
      id: "vlan-scenario-new-ap",
      title: "Guest Wi-Fi can reach the file server",
      ticket: {
        requester: "Practice manager",
        client: "Physiotherapy clinic",
        priority: "High",
        summary: "A patient on the guest Wi-Fi said they could see our 'Scans' shared folder.",
        symptoms: [
          "Guest Wi-Fi clients get 10.0.10.x addresses (the staff range).",
          "The guest SSID was meant to be on VLAN 30 (10.0.30.0/24).",
        ],
        environment: ["Firewall routing VLANs 10 (staff) and 30 (guest)", "Managed switch", "Two ceiling access points"],
        recentChanges: ["A replacement access point was installed last week."],
      },
      steps: [
        {
          id: "vlan-s1",
          prompt: "What's your first move?",
          options: [
            { text: "Disable the guest SSID on the new access point until it's fixed, then investigate.", correct: true, feedback: "Right. Guests on the staff network is a live security exposure: contain it first, then diagnose." },
            { text: "Change the file share permissions.", correct: false, feedback: "That doesn't fix guests being on the staff network, where they can reach everything else too." },
            { text: "Wait until after hours to look at it.", correct: false, feedback: "This is an active data exposure in a health practice. Contain it now." },
          ],
        },
        {
          id: "vlan-s2",
          prompt: "The new AP's guest SSID has no VLAN tag set, and its switch port is an access port in VLAN 10. What's the correct configuration?",
          options: [
            { text: "Make the AP's switch port a trunk carrying VLAN 10 (native/management) and VLAN 30 tagged, and set the guest SSID to VLAN 30 on the AP.", correct: true, feedback: "Correct. The AP needs a trunk so each SSID can be tagged into its own VLAN." },
            { text: "Move the AP's port into VLAN 30.", correct: false, feedback: "Then the staff SSID would be on the guest VLAN instead. The AP needs both VLANs over a trunk." },
            { text: "Give the guest SSID a different password.", correct: false, feedback: "The password doesn't change which network guests land on." },
          ],
        },
        {
          id: "vlan-s3",
          prompt: "Guests now get 10.0.30.x addresses. How do you confirm they're properly isolated?",
          options: [
            { text: "From a guest device, check you can reach the internet but cannot ping or browse to staff addresses (e.g. the file server), and confirm the firewall has a rule blocking guest-to-staff traffic.", correct: true, feedback: "Yes. Test the result from the guest side and confirm the rule exists, rather than assuming." },
            { text: "Check that the SSID name looks right.", correct: false, feedback: "The name tells you nothing about which VLAN the traffic uses." },
            { text: "Reboot the firewall.", correct: false, feedback: "Rebooting doesn't verify anything." },
          ],
        },
      ],
      resolution: "The replacement AP was patched into an access port on the staff VLAN and its guest SSID had no VLAN tag. The port was changed to a trunk (VLAN 10 native, VLAN 30 tagged), the guest SSID was tagged VLAN 30, and isolation was tested.",
      ticketNote: "Security: guest SSID on replacement AP bridged into staff VLAN 10. Contained by disabling guest SSID. Fix: Gi1/0/22 changed to trunk, native 10, allowed 10,30; guest SSID tagged VLAN 30. Verified guest gets 10.0.30.x, internet OK, no access to 10.0.10.0/24 (firewall rule 'Guest→Staff deny' confirmed). Recommend reviewing share access logs.",
    },
    sources: [
      { title: "IEEE 802.1Q: Bridges and Bridged Networks", url: "https://www.ieee802.org/1/pages/802.1Q.html", supports: ["802.1Q VLAN tagging", "Bridging and spanning tree"] },
    ],
  },

  // 4 ─────────────────────────────────────────────────────────── Routing
  {
    id: "net-routing",
    order: 4,
    title: "Routing and Default Gateways",
    shortTitle: "Routing",
    summary: "How traffic finds its way from one subnet to another, and what the default gateway really does.",
    whyItMatters:
      "Every \"can reach local things but not the internet\" or \"can't reach the other site\" ticket comes down to routing. Reading a routing table tells you exactly where a packet will go.",
    prerequisites: ["Subnetting basics", "VLANs and Switching"],
    objectives: [
      "Explain when a device sends traffic straight to the destination and when it uses the gateway.",
      "Read a routing table and apply longest-prefix match.",
      "Add and remove static routes safely.",
      "Use tracert to see where traffic stops.",
    ],
    sections: [
      {
        id: "route-gateway",
        title: "Local or remote? The gateway decision",
        body:
          "Before sending anything, a device compares the destination with its own subnet:\n\n- **Same subnet**: send directly. The device uses ARP to find the destination's MAC address.\n- **Different subnet**: send to the **default gateway** (a router or firewall), which forwards it onward.\n\nSo the gateway must be **an address inside the device's own subnet**. A PC at 10.0.10.25/24 with a gateway of 10.0.20.1 can talk to its neighbours but nothing else. If the subnet mask is wrong, the device can misjudge what's local: a /16 mask on a /24 network makes it try to ARP for remote hosts directly.",
      },
      {
        id: "route-table",
        title: "Reading a routing table",
        body:
          "A routing table lists destinations (network + mask), where to send them (next hop or interface) and a metric. When several routes match, the **most specific (longest prefix) wins**:\n\n| Destination | Next hop | Notes |\n|---|---|---|\n| 0.0.0.0/0 | 10.0.10.1 | Default route: anything not matched below |\n| 10.0.10.0/24 | on-link | The local subnet |\n| 192.168.50.0/24 | 10.0.10.254 | Branch office via the VPN appliance |\n\nA packet for 192.168.50.20 matches both 0.0.0.0/0 and 192.168.50.0/24; the /24 is longer, so it goes to 10.0.10.254. Ties on prefix length are broken by the lower **metric**.",
      },
      {
        id: "route-static",
        title: "Static and dynamic routes",
        body:
          "- **Static routes** are typed in by hand. Fine for small networks: a branch subnet via the VPN, or a lab network behind another router.\n- **Dynamic routing protocols** (OSPF inside an organisation, BGP between ISPs) let routers learn routes from each other. You'll meet them on larger clients and ISP links rather than in small offices.\n\nOn Windows, `route add` without `-p` disappears at reboot; with `-p` it's persistent. Usually it's better to put the route on the **gateway** rather than on every PC, so it's in one place.\n\nRouting has to work **both ways**: if the far network has no route back, replies never return.",
      },
      {
        id: "route-trace",
        title: "Seeing the path: tracert",
        body:
          "`tracert` (Windows) or `traceroute` (Linux/macOS) lists each router on the way, by sending packets with increasing TTL values. Read it like this:\n\n- It **stops at hop 1** → the gateway isn't forwarding, or the PC has the wrong gateway.\n- It reaches your firewall and then times out → the problem is at the firewall's WAN side or the ISP.\n- A few `* * *` lines in the middle while later hops respond → normal; many routers just don't answer traceroute.\n\n`pathping` combines tracert with packet-loss statistics per hop.",
      },
    ],
    keyTerms: [
      { term: "Default gateway", definition: "The router a device sends all non-local traffic to; must be inside the device's subnet." },
      { term: "Default route", definition: "0.0.0.0/0: the route used when nothing more specific matches." },
      { term: "Longest prefix match", definition: "When several routes match, the one with the longest subnet mask wins." },
      { term: "Metric", definition: "A cost value that breaks ties between equally specific routes; lower is preferred." },
      { term: "Static route", definition: "A manually configured route." },
      { term: "Next hop", definition: "The next router a packet is handed to on its way to the destination." },
    ],
    commands: [
      { command: "route print", purpose: "Show the Windows routing table." },
      { command: "Get-NetRoute -AddressFamily IPv4", purpose: "PowerShell view of the routing table." },
      { command: "route -p add 192.168.50.0 mask 255.255.255.0 10.0.10.254", purpose: "Add a persistent static route on Windows." },
      { command: "tracert 8.8.8.8", purpose: "List the routers between you and a destination." },
      { command: "pathping 8.8.8.8", purpose: "Trace the path and measure packet loss per hop." },
      { command: "ip route", purpose: "Show the routing table on Linux." },
    ],
    commonMistakes: [
      "Setting a static IP with a gateway that's outside the device's subnet.",
      "Adding a route on one side of a link and forgetting the return route on the other.",
      "Adding routes on individual PCs instead of on the gateway, then losing track of them.",
      "Assuming '* * *' in the middle of a traceroute means the problem is there.",
      "Mistyping the subnet mask so the device thinks remote hosts are local.",
    ],
    flashcards: [
      { id: "route-fc-1", front: "When does a PC send traffic to its default gateway?", back: "When the destination is outside its own subnet." },
      { id: "route-fc-2", front: "What is 0.0.0.0/0?", back: "The default route: it matches every destination not covered by a more specific route." },
      { id: "route-fc-3", front: "Two routes match a destination: a /16 and a /24. Which is used?", back: "The /24: longest prefix match picks the most specific route." },
      { id: "route-fc-4", front: "What does route -p do on Windows?", back: "Makes the static route persistent across reboots." },
      { id: "route-fc-5", front: "A traceroute stops at hop 1. What does that suggest?", back: "The gateway isn't forwarding, or the PC is using the wrong gateway." },
      { id: "route-fc-6", front: "Why must routing work in both directions?", back: "Replies need a route back; without one, traffic arrives but responses never return." },
    ],
    quiz: [
      {
        id: "route-q1",
        question: "A PC is set to 10.0.10.40/24 with gateway 10.0.1.1. It can print to 10.0.10.15 but can't reach the internet. Why?",
        options: [
          "DNS is wrong",
          "The gateway is outside the PC's subnet, so it can't be reached",
          "The printer is blocking the internet",
          "DHCP has run out",
        ],
        answerIndex: 1,
        explanation: "Local traffic works without a gateway. The gateway must be in 10.0.10.0/24 for the PC to use it.",
      },
      {
        id: "route-q2",
        question: "A routing table has 0.0.0.0/0 via 10.0.0.1 and 172.16.5.0/24 via 10.0.0.9. Where does a packet for 172.16.5.40 go?",
        options: ["10.0.0.1", "10.0.0.9", "It is dropped", "Both, load balanced"],
        answerIndex: 1,
        explanation: "Both routes match, but /24 is more specific than /0, so longest prefix match sends it to 10.0.0.9.",
      },
      {
        id: "route-q3",
        question: "Head office can ping the branch firewall's inside address, but not the PCs behind it. The branch can't reach head office at all. What's most likely missing?",
        options: [
          "A return route at the branch towards head office's subnet",
          "A DNS CNAME",
          "A DHCP reservation",
          "An SPF record",
        ],
        answerIndex: 0,
        explanation: "Routing must work both ways. Without a route back to head office's subnet, replies go out the branch's default route instead.",
      },
      {
        id: "route-q4",
        question: "Which command shows packet loss at each hop along the path?",
        options: ["ipconfig /all", "pathping", "arp -a", "nslookup"],
        answerIndex: 1,
        explanation: "pathping traces the route and then measures loss per hop over a period of time.",
      },
      {
        id: "route-q5",
        question: "You added a route on a Windows server with 'route add …' and it disappeared after patching. What should you have used?",
        options: ["route -p add …", "ipconfig /renew", "netsh wlan", "tracert -d"],
        answerIndex: 0,
        explanation: "Without -p the route lives only until reboot. Better still, put the route on the gateway.",
      },
    ],
    scenario: {
      id: "route-scenario-lab",
      title: "Can't reach the new warehouse network",
      ticket: {
        requester: "Operations manager",
        client: "Wholesale distributor",
        priority: "Medium",
        summary: "Office PCs can't reach the stock scanners on the new warehouse network.",
        symptoms: [
          "Warehouse network 10.0.60.0/24 sits behind a separate router whose office-side address is 10.0.10.250.",
          "Office PCs (10.0.10.0/24, gateway 10.0.10.1, the firewall) time out to 10.0.60.20.",
          "The warehouse router itself can ping office PCs.",
        ],
        environment: ["Office firewall 10.0.10.1", "Warehouse router 10.0.10.250 / 10.0.60.1"],
        recentChanges: ["Warehouse router installed yesterday by an electrician's contractor."],
      },
      steps: [
        {
          id: "route-s1",
          prompt: "From an office PC, `tracert 10.0.60.20` shows hop 1 = 10.0.10.1 and then times out. What does this tell you?",
          options: [
            { text: "Traffic goes to the firewall (the default gateway), which doesn't know that 10.0.60.0/24 lives behind 10.0.10.250.", correct: true, feedback: "Right. The PC correctly sends remote traffic to its gateway; the gateway has no route for the warehouse subnet." },
            { text: "The warehouse scanners are switched off.", correct: false, feedback: "Possible, but the trace shows the traffic is going the wrong way before it ever reaches the warehouse router." },
            { text: "DNS is failing.", correct: false, feedback: "You traced to an IP address, so DNS isn't involved." },
          ],
        },
        {
          id: "route-s2",
          prompt: "Where's the best place to fix it?",
          options: [
            { text: "Add a static route on the office firewall: 10.0.60.0/24 via 10.0.10.250.", correct: true, feedback: "Correct. One route on the gateway fixes every office PC, and it's documented in one place." },
            { text: "Add a persistent route on every office PC.", correct: false, feedback: "It works, but it's fragile and invisible. New PCs won't have it and nobody will remember it's there." },
            { text: "Change every PC's gateway to 10.0.10.250.", correct: false, feedback: "Then internet traffic would go to the warehouse router, which may not route it correctly." },
          ],
        },
        {
          id: "route-s3",
          prompt: "After adding the route, pings to 10.0.60.20 work but the scanner software is slow and some sessions drop. What do you check?",
          options: [
            { text: "Whether the warehouse router's default route points back via the firewall (asymmetric routing), and whether the firewall is dropping return traffic it didn't see leave.", correct: true, feedback: "Yes. If replies take a different path, a stateful firewall can drop them. Check both directions." },
            { text: "Flush DNS on the scanners.", correct: false, feedback: "This is a path problem, not a name problem." },
            { text: "Increase the DHCP lease time.", correct: false, feedback: "Lease times don't affect routing paths." },
          ],
        },
      ],
      resolution: "The firewall had no route to the new warehouse subnet. A static route (10.0.60.0/24 via 10.0.10.250) was added on the firewall, and the warehouse router's return path was checked to avoid asymmetric routing.",
      ticketNote: "Cause: no route on office firewall for new warehouse subnet 10.0.60.0/24. Added static route via 10.0.10.250. Verified tracert office→10.0.60.20 (2 hops) and return path via 10.0.10.1. Scanner app tested OK. Network diagram updated.",
    },
    sources: [
      { title: "RFC 1812: Requirements for IP Version 4 Routers", url: "https://www.rfc-editor.org/rfc/rfc1812", supports: ["Forwarding decisions", "Longest prefix match"] },
      { title: "RFC 4632: Classless Inter-domain Routing (CIDR)", url: "https://www.rfc-editor.org/rfc/rfc4632", supports: ["Prefix notation", "Route aggregation"] },
      { title: "Microsoft Learn: route command", url: "https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/route_ws2008", supports: ["route print", "route -p add"] },
      { title: "Microsoft Learn: tracert command", url: "https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/tracert", supports: ["Tracing the path to a destination"] },
    ],
  },

  // 5 ──────────────────────────────────────────────────────── NAT / firewall
  {
    id: "net-nat-firewall",
    order: 5,
    title: "NAT, Port Forwarding and Firewall Rules",
    shortTitle: "NAT & Firewalls",
    summary: "How a private network reaches the internet, how to expose a service safely, and how firewall rules decide what's allowed.",
    whyItMatters:
      "Every client has a firewall doing NAT. Port forwards, VPN problems, double NAT from ISP modems and 'can't reach the camera remotely' tickets all come down to understanding NAT and stateful rules.",
    prerequisites: ["Routing and Default Gateways"],
    objectives: [
      "Identify private, CGNAT and public address ranges.",
      "Explain how NAT/PAT lets many devices share one public address.",
      "Create a port forward and explain the risk of exposing services.",
      "Write least-privilege firewall rules and recognise double NAT.",
    ],
    sections: [
      {
        id: "nat-private",
        title: "Private addresses and NAT",
        body:
          "Inside networks use **private (RFC 1918) addresses**, which are never routed on the internet:\n\n- **10.0.0.0/8**\n- **172.16.0.0/12** (172.16.0.0–172.31.255.255)\n- **192.168.0.0/16**\n\nThe firewall replaces the private source address with its public one on the way out (**NAT**), and keeps a table so replies come back to the right device. Because many devices share one public IP, it also changes the source **port**: this is **PAT** (port address translation, also called NAT overload or masquerade).\n\nAlso know **100.64.0.0/10**: the **carrier-grade NAT** range. If a firewall's WAN shows a 100.64–100.127 address, the ISP is doing NAT too, so inbound port forwards from the internet will never arrive.",
      },
      {
        id: "nat-forward",
        title: "Port forwarding (destination NAT)",
        body:
          "Outbound connections just work, but nothing on the internet can start a connection in unless you create a **port forward**: \"traffic arriving on public port X goes to internal host Y on port Z\", plus a firewall rule allowing it.\n\nEvery port forward exposes a service to the whole internet. Rules of thumb:\n\n- **Never expose RDP (3389)**, SMB (445) or admin web interfaces directly. Use a VPN or a secure remote-access tool instead.\n- If you must forward, restrict the **source IPs** where possible, keep the service patched and log it.\n- Document why each forward exists and remove it when it's no longer needed.\n\n**Hairpin NAT** (NAT loopback) is when an inside user browses to the public address of a service inside the same network. Some firewalls don't support it, so it works from outside but not inside; split DNS is the usual fix.",
      },
      {
        id: "nat-rules",
        title: "Stateful firewall rules",
        body:
          "Modern firewalls are **stateful**: they remember outbound connections and automatically allow the replies, so you only write rules for traffic that starts a connection.\n\nA rule is: **source → destination, service/port, action**, read top-down with the **first match winning** and an implicit **deny all** at the bottom.\n\nGood rules are **least privilege**: \"Accounts VLAN → 10.0.10.20 on TCP 1433, allow\" rather than \"any → any, allow\". Name rules, add comments with ticket numbers, and log denies so you can see what's being blocked.",
      },
      {
        id: "nat-double",
        title: "Double NAT",
        body:
          "Double NAT happens when the ISP's modem/router does NAT **and** the client's firewall behind it does NAT too. The firewall's WAN gets a private address (e.g. 192.168.1.2) from the modem.\n\nSymptoms: port forwards don't work, some VPNs and VoIP calls fail (one-way audio), and online games or cameras complain about 'strict NAT'.\n\nFixes, best first: put the ISP device in **bridge mode** (the firewall gets the public IP directly), or configure the modem to send everything to the firewall (DMZ host / IP passthrough). If the WAN address is in 100.64.0.0/10, ask the ISP for a public or static IP.",
      },
    ],
    keyTerms: [
      { term: "RFC 1918", definition: "The private IPv4 ranges: 10.0.0.0/8, 172.16.0.0/12 and 192.168.0.0/16." },
      { term: "NAT / PAT", definition: "Rewriting private source addresses (and ports) to a shared public address on the way out." },
      { term: "CGNAT", definition: "Carrier-grade NAT by the ISP, using 100.64.0.0/10; blocks inbound connections." },
      { term: "Port forward", definition: "Destination NAT sending traffic on a public port to an internal host." },
      { term: "Stateful firewall", definition: "A firewall that tracks connections and automatically allows their return traffic." },
      { term: "Implicit deny", definition: "The final 'block everything else' rule at the bottom of a rule set." },
      { term: "Double NAT", definition: "Two NAT devices in a row (ISP modem plus firewall), which breaks inbound access and some protocols." },
      { term: "Hairpin NAT", definition: "Reaching an internal service via its public address from inside the same network." },
    ],
    commands: [
      { command: "curl https://ifconfig.me", purpose: "Show the public IP address you're coming from." },
      { command: "Test-NetConnection <public-ip> -Port 443", purpose: "Test whether a port is reachable from where you are." },
      { command: "ipconfig /all", purpose: "Check whether a device is on a private range and what its gateway is." },
    ],
    commonMistakes: [
      "Port forwarding RDP to a server 'just for the weekend'.",
      "Creating a port forward but no matching firewall allow rule (or the reverse).",
      "Testing a port forward from inside the network and concluding it's broken (hairpin NAT).",
      "Not noticing the firewall's WAN address is private or 100.64.x.x, so forwards can never work.",
      "Writing broad 'any any allow' rules to make something work and never tightening them.",
    ],
    flashcards: [
      { id: "nat-fc-1", front: "List the three RFC 1918 private ranges.", back: "10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16." },
      { id: "nat-fc-2", front: "What range does carrier-grade NAT use?", back: "100.64.0.0/10 (100.64.0.0–100.127.255.255)." },
      { id: "nat-fc-3", front: "What does 'stateful' mean for a firewall?", back: "It tracks connections and automatically allows the return traffic." },
      { id: "nat-fc-4", front: "In what order are firewall rules evaluated?", back: "Top-down; the first matching rule wins, with an implicit deny at the end." },
      { id: "nat-fc-5", front: "Why should you not port forward 3389?", back: "Exposed RDP is constantly attacked; use a VPN or a secure remote-access tool instead." },
      { id: "nat-fc-6", front: "What's the usual fix for double NAT?", back: "Put the ISP modem in bridge mode (or IP passthrough) so the firewall holds the public IP." },
    ],
    quiz: [
      {
        id: "nat-q1",
        question: "Which address is NOT private (RFC 1918)?",
        options: ["10.40.2.1", "172.20.0.5", "172.32.0.5", "192.168.88.1"],
        answerIndex: 2,
        explanation: "172.16.0.0/12 covers 172.16.0.0–172.31.255.255, so 172.32.0.5 is a public address.",
      },
      {
        id: "nat-q2",
        question: "A client's port forward for their NVR doesn't work. The firewall WAN shows 100.72.14.9. What's the problem?",
        options: [
          "The NVR needs a reservation",
          "The ISP is using carrier-grade NAT, so inbound connections can't reach the firewall",
          "The DNS TTL is too high",
          "The firewall needs a firmware update",
        ],
        answerIndex: 1,
        explanation: "100.64.0.0/10 is the CGNAT range. The public IP belongs to the ISP's NAT, so the client needs a public/static IP or a cloud relay.",
      },
      {
        id: "nat-q3",
        question: "A stateful firewall allows the office LAN out to the internet. Do you need a rule to allow web replies back in?",
        options: [
          "Yes, allow TCP 443 inbound from any",
          "No, the firewall automatically allows return traffic for tracked connections",
          "Yes, allow all inbound traffic",
          "Only for HTTP, not HTTPS",
        ],
        answerIndex: 1,
        explanation: "Stateful inspection matches replies to the outbound connection, so no inbound rule is needed.",
      },
      {
        id: "nat-q4",
        question: "A supplier asks you to open RDP to the accounts server so they can support their software. What's the best response?",
        options: [
          "Forward TCP 3389 from any to the server",
          "Provide access via the client's VPN or a secure remote-access tool with MFA, limited to that server",
          "Change RDP to port 3390 and forward that",
          "Disable the firewall during support sessions",
        ],
        answerIndex: 1,
        explanation: "Changing the port doesn't hide RDP from scanners. Give controlled, authenticated access instead of exposing the service.",
      },
      {
        id: "nat-q5",
        question: "The firewall's WAN interface has the address 192.168.1.2 and the ISP modem is 192.168.1.1. What is this called?",
        options: ["Hairpin NAT", "Double NAT", "Split tunnelling", "Port address translation"],
        answerIndex: 1,
        explanation: "The modem NATs and the firewall NATs again behind it. Bridge mode on the modem removes one layer.",
      },
    ],
    scenario: {
      id: "nat-scenario-camera",
      title: "The owner can't view the cameras from home",
      ticket: {
        requester: "Business owner",
        client: "Retail shop",
        priority: "Low",
        summary: "Camera app on my phone stopped working away from the shop after the NBN changeover.",
        symptoms: [
          "The camera app works on the shop Wi-Fi.",
          "Away from the shop it times out.",
          "The old setup used a port forward to the NVR.",
        ],
        environment: ["New ISP modem/router", "Client firewall behind it", "NVR at 10.0.40.10"],
        recentChanges: ["ISP changed last week; the new modem was installed in front of the existing firewall."],
      },
      steps: [
        {
          id: "nat-s1",
          prompt: "What do you check on the client's firewall?",
          options: [
            { text: "The WAN interface address: is it a public IP, a private 192.168.x.x from the modem, or a 100.64.x.x CGNAT address?", correct: true, feedback: "Right. That instantly tells you whether inbound traffic can even reach the firewall." },
            { text: "The NVR's admin password.", correct: false, feedback: "The app times out, which points to connectivity, not credentials." },
            { text: "The DHCP lease time.", correct: false, feedback: "Unrelated to inbound access from the internet." },
          ],
        },
        {
          id: "nat-s2",
          prompt: "The firewall WAN shows 192.168.1.2 and the modem is 192.168.1.1: double NAT. What's the best fix?",
          options: [
            { text: "Put the ISP modem into bridge mode (or IP passthrough) so the firewall gets the public IP directly.", correct: true, feedback: "Correct. That removes the extra NAT layer and keeps the firewall in control." },
            { text: "Turn off the client's firewall and use the ISP modem instead.", correct: false, feedback: "You'd lose the client's security policy, VLANs and logging." },
            { text: "Add a second port forward on the phone.", correct: false, feedback: "The phone isn't where the NAT happens." },
          ],
        },
        {
          id: "nat-s3",
          prompt: "Remote viewing works again. The old setup forwarded the NVR's web port to the internet. What do you recommend?",
          options: [
            { text: "Remove the port forward and use the camera vendor's secure cloud/P2P service or the client VPN, with the NVR firmware updated.", correct: true, feedback: "Yes. NVRs are a frequent target; avoid exposing their web interface directly." },
            { text: "Keep the port forward; it was working before.", correct: false, feedback: "Working isn't the same as safe. Exposed NVRs are commonly compromised." },
            { text: "Change the NVR to a different port.", correct: false, feedback: "Port changes don't stop internet-wide scanning." },
          ],
        },
      ],
      resolution: "The new ISP modem created double NAT, so the old port forward never reached the firewall. The modem was put in bridge mode and remote viewing moved to the vendor's secure app connection, removing the exposed port forward.",
      ticketNote: "Cause: double NAT after ISP change (FW WAN 192.168.1.2 behind modem). Modem set to bridge mode, FW WAN now public IP. Removed legacy port forward TCP 8000 → NVR; enabled vendor P2P app access; NVR firmware updated. Owner confirmed remote viewing.",
    },
    sources: [
      { title: "RFC 1918: Address Allocation for Private Internets", url: "https://www.rfc-editor.org/rfc/rfc1918", supports: ["10/8, 172.16/12 and 192.168/16 private ranges"] },
      { title: "RFC 6598: Shared Address Space (100.64.0.0/10)", url: "https://www.rfc-editor.org/rfc/rfc6598", supports: ["Carrier-grade NAT address range"] },
      { title: "RFC 3022: Traditional IP Network Address Translator", url: "https://www.rfc-editor.org/rfc/rfc3022", supports: ["NAT and NAPT (port translation)"] },
    ],
  },

  // 6 ─────────────────────────────────────────────────────────────── Ports
  {
    id: "net-ports",
    order: 6,
    title: "Common Ports and Protocols",
    shortTitle: "Ports",
    summary: "The port numbers that come up every week in firewall rules and troubleshooting, and how to test them.",
    whyItMatters:
      "Firewall rules, \"is it blocked?\" questions and vendor requirements are all written in port numbers. Knowing the common ones, and TCP vs UDP, saves constant lookups and wrong rules.",
    prerequisites: ["NAT, Port Forwarding and Firewall Rules"],
    objectives: [
      "Explain the difference between TCP and UDP.",
      "Recall the common ports for web, email, DNS, remote access, file sharing and directory services.",
      "Choose the secure version of a protocol.",
      "Test whether a port is reachable.",
    ],
    sections: [
      {
        id: "ports-tcp-udp",
        title: "TCP vs UDP",
        body:
          "- **TCP** sets up a connection (the three-way handshake: SYN, SYN-ACK, ACK), delivers data in order and resends anything lost. Used for web, email, file sharing and remote desktop.\n- **UDP** just sends packets with no handshake or resending. Faster and lighter, used for DNS lookups, DHCP, voice/video, NTP and modern HTTP/3 (QUIC on UDP 443).\n\nA port number only means something together with the protocol: **TCP 53 and UDP 53 are different rules**. Ports 0–1023 are 'well-known' and assigned by IANA.",
      },
      {
        id: "ports-list",
        title: "The ports to know",
        body:
          "| Port | Protocol | Service |\n|---|---|---|\n| 20/21 | TCP | FTP (insecure; prefer SFTP) |\n| 22 | TCP | SSH / SFTP |\n| 23 | TCP | Telnet (insecure; avoid) |\n| 25 | TCP | SMTP between mail servers |\n| 53 | UDP/TCP | DNS |\n| 67/68 | UDP | DHCP |\n| 80 / 443 | TCP (443 also UDP for QUIC) | HTTP / HTTPS |\n| 88 | TCP/UDP | Kerberos |\n| 123 | UDP | NTP (time) |\n| 135 | TCP | Microsoft RPC endpoint mapper |\n| 143 / 993 | TCP | IMAP / IMAP over TLS |\n| 161 / 162 | UDP | SNMP / SNMP traps |\n| 389 / 636 | TCP | LDAP / LDAP over TLS |\n| 445 | TCP | SMB file sharing |\n| 465 / 587 | TCP | SMTP submission (TLS / STARTTLS) |\n| 514 | UDP | Syslog |\n| 1433 | TCP | Microsoft SQL Server |\n| 3389 | TCP | Remote Desktop (RDP) |\n| 5060 / 5061 | UDP/TCP | SIP voice signalling (5061 = TLS) |",
      },
      {
        id: "ports-secure",
        title: "Choosing the secure version",
        body:
          "Many protocols have a plaintext version and an encrypted one. Default to the encrypted one:\n\n- FTP (21) → **SFTP** (22) or FTPS\n- Telnet (23) → **SSH** (22)\n- HTTP (80) → **HTTPS** (443)\n- LDAP (389) → **LDAPS** (636) or LDAP with signing\n- IMAP (143) / POP3 (110) → **993 / 995**\n- SNMP v1/v2c (community strings sent in clear) → **SNMPv3**\n\nPrinters and scanners that 'scan to email' usually need SMTP submission on **587** with authentication (or a relay), not port 25.",
      },
      {
        id: "ports-test",
        title: "Testing a port",
        body:
          "`ping` only tests ICMP; it says nothing about whether a port is open. Test the actual port:\n\n- `Test-NetConnection server01 -Port 445` in PowerShell shows `TcpTestSucceeded : True/False`.\n- `netstat -ano` on the server shows which ports are listening and the owning process ID.\n- UDP is harder to test because there's no handshake; check the service's own logs or use a protocol-specific tool (e.g. `nslookup` for DNS).\n\nIf a TCP test fails, work out whether it's **nothing listening** (service down) or **something blocking** (firewall on the host, on the network, or both).",
      },
    ],
    keyTerms: [
      { term: "TCP", definition: "Connection-oriented transport with a handshake, ordering and retransmission." },
      { term: "UDP", definition: "Connectionless transport: no handshake or retransmission; used for DNS, DHCP, voice and QUIC." },
      { term: "Well-known ports", definition: "Ports 0–1023, assigned by IANA to standard services." },
      { term: "Listening port", definition: "A port a service has opened to accept connections." },
      { term: "QUIC", definition: "The UDP-based transport behind HTTP/3, using UDP 443." },
      { term: "SMTP submission", definition: "Port 587 (STARTTLS) or 465 (implicit TLS) used by clients and devices to send mail." },
    ],
    commands: [
      { command: "Test-NetConnection server01 -Port 3389", purpose: "Test whether a TCP port is reachable." },
      { command: "netstat -ano | findstr :443", purpose: "Show whether something is listening on a port, and its process ID." },
      { command: "Get-NetTCPConnection -State Listen", purpose: "PowerShell list of listening TCP ports." },
      { command: "tasklist /fi \"PID eq 1234\"", purpose: "Find which program owns a process ID from netstat." },
    ],
    commonMistakes: [
      "Using ping to 'prove' a port is open or closed.",
      "Opening TCP when the service needs UDP (DNS, SIP, NTP, syslog) or forgetting it needs both.",
      "Configuring a scan-to-email printer on port 25 to Microsoft 365 instead of authenticated submission on 587.",
      "Leaving Telnet, FTP or SNMP v2c enabled on devices because 'it came that way'.",
    ],
    flashcards: [
      { id: "ports-fc-1", front: "RDP port?", back: "TCP 3389." },
      { id: "ports-fc-2", front: "SMB file sharing port?", back: "TCP 445." },
      { id: "ports-fc-3", front: "LDAP and LDAPS ports?", back: "389 and 636." },
      { id: "ports-fc-4", front: "Which port do devices use to submit email with STARTTLS?", back: "TCP 587." },
      { id: "ports-fc-5", front: "Kerberos port?", back: "88 (TCP and UDP)." },
      { id: "ports-fc-6", front: "NTP port and protocol?", back: "UDP 123." },
      { id: "ports-fc-7", front: "SNMP and SNMP trap ports?", back: "UDP 161 (queries) and 162 (traps)." },
      { id: "ports-fc-8", front: "Why doesn't ping prove a port is open?", back: "Ping uses ICMP, not TCP/UDP ports. Use Test-NetConnection -Port." },
    ],
    quiz: [
      {
        id: "ports-q1",
        question: "A user can't reach a mapped drive on the file server. Which port should you test?",
        options: ["TCP 3389", "TCP 445", "UDP 161", "TCP 25"],
        answerIndex: 1,
        explanation: "Windows file sharing uses SMB on TCP 445.",
      },
      {
        id: "ports-q2",
        question: "Which protocol and port does DNS mainly use for normal lookups?",
        options: ["TCP 80", "UDP 53", "UDP 123", "TCP 389"],
        answerIndex: 1,
        explanation: "DNS lookups normally use UDP 53, with TCP 53 for large answers and zone transfers.",
      },
      {
        id: "ports-q3",
        question: "A multifunction printer's scan-to-email stopped working after the client moved to Microsoft 365. What's the usual correct setup?",
        options: [
          "SMTP on port 25 with no authentication",
          "SMTP submission on port 587 with STARTTLS and authentication (or a configured relay)",
          "IMAP on port 143",
          "HTTP on port 80",
        ],
        answerIndex: 1,
        explanation: "Devices send through authenticated submission on 587, or through a connector/relay configured for them.",
      },
      {
        id: "ports-q4",
        question: "`Test-NetConnection sql01 -Port 1433` returns TcpTestSucceeded: False, but ping works. What does that tell you?",
        options: [
          "The server is off",
          "The host is reachable but nothing is listening on 1433 or something is blocking it",
          "DNS is broken",
          "The cable is faulty",
        ],
        answerIndex: 1,
        explanation: "Ping proves IP connectivity. Next, check `netstat -ano` on the server and the firewalls in between.",
      },
      {
        id: "ports-q5",
        question: "Which is the secure replacement for Telnet?",
        options: ["FTP", "SSH", "SNMP", "SMB"],
        answerIndex: 1,
        explanation: "SSH (TCP 22) gives an encrypted remote shell; Telnet sends everything, including passwords, in plain text.",
      },
    ],
    scenario: {
      id: "ports-scenario-sql",
      title: "The accounting software can't find its database",
      ticket: {
        requester: "Bookkeeper",
        client: "Engineering firm",
        priority: "High",
        summary: "Since this morning's updates, the accounting program says 'cannot connect to server'.",
        symptoms: [
          "The SQL database runs on SRV01.",
          "Users can still open mapped drives on SRV01.",
          "The server installed Windows updates overnight.",
        ],
        environment: ["Windows Server with SQL Server Express", "Windows Defender Firewall enabled"],
        recentChanges: ["Overnight Windows updates on SRV01."],
      },
      steps: [
        {
          id: "ports-s1",
          prompt: "Mapped drives work, so the server is reachable. What do you test from a user PC?",
          options: [
            { text: "Test-NetConnection SRV01 -Port 1433 (or the instance's configured port).", correct: true, feedback: "Right. File sharing working proves IP and SMB, not SQL. Test SQL's port specifically." },
            { text: "ping SRV01", correct: false, feedback: "Ping doesn't test the SQL port, and you already know the server is reachable." },
            { text: "ipconfig /renew", correct: false, feedback: "The PC's addressing is fine; it reaches SRV01 for files." },
          ],
        },
        {
          id: "ports-s2",
          prompt: "The port test fails. On SRV01, `netstat -ano | findstr :1433` shows nothing listening. What's most likely?",
          options: [
            { text: "The SQL Server service didn't start after the reboot, or SQL Express is using a dynamic port. Check the service and SQL Server Configuration Manager.", correct: true, feedback: "Correct. Nothing listening means a service problem, not a firewall problem. SQL Express also uses dynamic ports by default unless a static port is set." },
            { text: "The firewall is blocking it.", correct: false, feedback: "A firewall would block traffic to a listening port; here nothing is listening at all." },
            { text: "DNS has the wrong IP for SRV01.", correct: false, feedback: "Mapped drives to SRV01 work, so the name resolves correctly." },
          ],
        },
        {
          id: "ports-s3",
          prompt: "The SQL service had stopped; you start it and set it to Automatic (Delayed Start). The port now listens but users still can't connect. What next?",
          options: [
            { text: "Check that Windows Defender Firewall on SRV01 allows inbound TCP 1433 (and UDP 1434 if the SQL Browser is used) from the office subnet.", correct: true, feedback: "Yes. Now that the service is listening, the host firewall is the next layer to check." },
            { text: "Reinstall the accounting software on every PC.", correct: false, feedback: "Way too drastic before checking the firewall." },
            { text: "Open 1433 to the internet on the edge firewall.", correct: false, feedback: "Never expose SQL to the internet; this is internal traffic." },
          ],
        },
      ],
      resolution: "The SQL Server service didn't restart after updates, and the post-update firewall profile blocked TCP 1433. The service was set to delayed automatic start and an inbound rule for the office subnet was restored.",
      ticketNote: "Cause: SQL Server (SQLEXPRESS) service stopped after updates; inbound 1433 rule missing in Domain profile. Started service, set Automatic (Delayed). Added Defender Firewall rule TCP 1433 from 10.0.10.0/24 (Domain profile). Test-NetConnection OK, accounting app connects.",
    },
    sources: [
      { title: "IANA Service Name and Transport Protocol Port Number Registry", url: "https://www.iana.org/assignments/service-names-port-numbers/service-names-port-numbers.xhtml", supports: ["Port assignments"] },
      { title: "RFC 6335: Port number assignment procedures", url: "https://www.rfc-editor.org/rfc/rfc6335", supports: ["Port ranges and how they are assigned"] },
      { title: "Microsoft Learn: Service overview and network port requirements for Windows", url: "https://learn.microsoft.com/en-us/troubleshoot/windows-server/networking/service-overview-and-network-port-requirements", supports: ["Windows service ports (SMB, RDP, Kerberos, LDAP, RPC)"] },
      { title: "Microsoft Learn: Test-NetConnection", url: "https://learn.microsoft.com/en-us/powershell/module/nettcpip/test-netconnection", supports: ["Testing TCP port reachability"] },
    ],
  },

  // 7 ──────────────────────────────────────────────────────────────── VPNs
  {
    id: "net-vpn",
    order: 7,
    title: "VPNs and Remote Access",
    shortTitle: "VPNs",
    summary: "Connecting sites and remote staff securely, and the subnet clash that breaks VPNs.",
    whyItMatters:
      "Remote staff and multi-site clients depend on VPNs. Most VPN tickets are overlapping subnets, mismatched settings or MTU problems, all of which you can find methodically.",
    prerequisites: ["Subnetting basics", "Routing and Default Gateways", "NAT, Port Forwarding and Firewall Rules"],
    objectives: [
      "Tell site-to-site VPNs from client (remote-access) VPNs.",
      "Name the ports used by IPsec/IKEv2, SSL VPN and WireGuard.",
      "Explain the overlapping-subnet problem and how to avoid it.",
      "Choose between split and full tunnelling, and troubleshoot a VPN that won't come up.",
    ],
    sections: [
      {
        id: "vpn-types",
        title: "Site-to-site vs client VPN",
        body:
          "- A **site-to-site VPN** joins two networks permanently, firewall to firewall. Users at the branch just reach head-office servers as if they were local.\n- A **client (remote-access) VPN** connects one device to the office network. Staff run a VPN client on a laptop.\n\nCommon technologies:\n\n| Type | Ports |\n|---|---|\n| **IPsec with IKEv2** | UDP 500 (IKE), UDP 4500 (NAT traversal), ESP (IP protocol 50) |\n| **SSL VPN** | Usually TCP 443, so it works on most networks |\n| **WireGuard** | One UDP port (51820 is the conventional choice) |\n\nRemote access should always use **MFA**.",
      },
      {
        id: "vpn-overlap",
        title: "The overlapping subnet problem",
        body:
          "A VPN routes traffic for the other side's subnet into the tunnel. If both sides use the **same subnet**, the device can't tell local from remote.\n\nThe classic case: the office uses **192.168.1.0/24** and so does almost every home router. A remote worker at home connects the VPN, but traffic for 192.168.1.20 (the office server) stays on their home network.\n\nPrevention is the real fix: **give business networks uncommon ranges**, e.g. 10.42.10.0/24 instead of 192.168.0.0/24 or 192.168.1.0/24, and plan every site's subnet so none overlap. When you can't renumber, some firewalls support NAT inside the tunnel, but it adds complexity.",
      },
      {
        id: "vpn-split",
        title: "Split vs full tunnelling",
        body:
          "- **Full tunnel**: all of the laptop's traffic, including internet browsing, goes through the office. The office firewall filters everything, but it uses office bandwidth and slows Teams calls.\n- **Split tunnel**: only traffic for office subnets goes through the VPN; everything else uses the local internet.\n\nMicrosoft recommends sending Microsoft 365 traffic (Teams in particular) directly rather than through the VPN. Many MSPs use split tunnelling plus endpoint protection and DNS filtering on the laptop.",
      },
      {
        id: "vpn-troubleshoot",
        title: "When a VPN won't connect or behaves oddly",
        body:
          "- **Tunnel won't come up (site-to-site)**: Phase 1/Phase 2 settings must match exactly on both ends: encryption, hashing, DH group, lifetimes, pre-shared key and the local/remote subnets. The firewall logs usually name the mismatch.\n- **Client can't connect**: check the user's account and MFA, the client version, and whether the user's network blocks UDP 500/4500 (hotels often do; SSL VPN on 443 is the fallback).\n- **Connected but can't reach things**: routes (overlap?), firewall rules for VPN users, and DNS (internal names need internal DNS servers pushed to the client).\n- **Some things work, large transfers hang**: MTU. The VPN headers make packets bigger, so lower the tunnel MTU / MSS.",
      },
    ],
    keyTerms: [
      { term: "Site-to-site VPN", definition: "A permanent tunnel joining two networks, usually firewall to firewall." },
      { term: "Client VPN", definition: "Remote-access VPN from one device into the office network." },
      { term: "IKEv2", definition: "The key-exchange protocol for IPsec VPNs, on UDP 500 and 4500." },
      { term: "ESP", definition: "Encapsulating Security Payload: the IPsec protocol (IP protocol 50) that carries encrypted data." },
      { term: "Split tunnel", definition: "Only traffic for office networks goes through the VPN." },
      { term: "Full tunnel", definition: "All traffic, including internet, goes through the VPN." },
      { term: "MTU / MSS", definition: "Maximum packet / segment size. VPN overhead can push packets over the limit, causing hangs." },
    ],
    commands: [
      { command: "route print", purpose: "Check which subnets the VPN client is sending into the tunnel." },
      { command: "ipconfig /all", purpose: "Check the VPN adapter's address and DNS servers." },
      { command: "Test-NetConnection vpn.example.com -Port 443", purpose: "Check the VPN endpoint is reachable from the user's network." },
      { command: "ping -f -l 1400 10.42.10.5", purpose: "Test for MTU problems (don't-fragment flag, 1400-byte payload)." },
    ],
    commonMistakes: [
      "Using 192.168.0.0/24 or 192.168.1.0/24 for a business network, guaranteeing overlap with home routers.",
      "Copying VPN settings by eye and missing one mismatched Phase 2 parameter.",
      "Forgetting to push internal DNS servers to VPN clients, so internal names don't resolve.",
      "Forcing Teams calls through a full-tunnel VPN.",
      "Allowing VPN logins without MFA.",
    ],
    flashcards: [
      { id: "vpn-fc-1", front: "Which UDP ports does IPsec IKEv2 use?", back: "UDP 500, and UDP 4500 for NAT traversal (plus ESP, IP protocol 50)." },
      { id: "vpn-fc-2", front: "Why does an office on 192.168.1.0/24 cause VPN problems?", back: "Most home routers use the same range, so remote users' devices think the office is local." },
      { id: "vpn-fc-3", front: "Split vs full tunnel?", back: "Split: only office traffic uses the VPN. Full: all traffic goes through the office." },
      { id: "vpn-fc-4", front: "What must match for a site-to-site tunnel to come up?", back: "Phase 1 and 2 settings: encryption, hash, DH group, lifetimes, PSK/certs and the subnets on each side." },
      { id: "vpn-fc-5", front: "VPN connects, small things work, big transfers hang. Suspect?", back: "MTU/MSS: VPN overhead makes packets too big." },
      { id: "vpn-fc-6", front: "What port does SSL VPN usually use?", back: "TCP 443." },
    ],
    quiz: [
      {
        id: "vpn-q1",
        question: "A remote worker connects to the VPN fine but can't reach the office server at 192.168.1.10. Their home router is 192.168.1.1. What's the problem?",
        options: [
          "The VPN password is wrong",
          "Overlapping subnets: the laptop treats 192.168.1.10 as a local home address",
          "The office internet is down",
          "DNS TTL",
        ],
        answerIndex: 1,
        explanation: "Both networks use 192.168.1.0/24, so traffic for the server never enters the tunnel. Renumber the office to an uncommon range.",
      },
      {
        id: "vpn-q2",
        question: "A site-to-site tunnel won't establish after a firewall replacement. What's the most useful first check?",
        options: [
          "Compare Phase 1/Phase 2 settings and the firewall VPN logs on both ends",
          "Reboot both firewalls repeatedly",
          "Change the DNS servers",
          "Increase the DHCP scope",
        ],
        answerIndex: 0,
        explanation: "Tunnels fail on any parameter mismatch; the logs usually say which proposal was rejected.",
      },
      {
        id: "vpn-q3",
        question: "Staff say Teams calls are choppy only while connected to the VPN. What change helps most?",
        options: [
          "Use split tunnelling so Microsoft 365/Teams traffic goes direct",
          "Increase the DHCP lease time",
          "Disable MFA",
          "Change the SSID",
        ],
        answerIndex: 0,
        explanation: "Full tunnelling hairpins Teams through the office link. Microsoft recommends sending Microsoft 365 traffic directly.",
      },
      {
        id: "vpn-q4",
        question: "Which subnet is the best choice for a new client office to avoid VPN clashes?",
        options: ["192.168.1.0/24", "192.168.0.0/24", "10.37.20.0/24", "192.168.100.0/24 on every site"],
        answerIndex: 2,
        explanation: "An uncommon 10.x range is unlikely to match home networks, and planning a unique range per site avoids clashes between offices.",
      },
      {
        id: "vpn-q5",
        question: "A user in a hotel can't connect the IPsec VPN, but web browsing works. What's a likely cause?",
        options: [
          "The hotel network blocks UDP 500/4500",
          "Their DHCP lease expired",
          "The office SPF record is wrong",
          "Their laptop needs a new MAC address",
        ],
        answerIndex: 0,
        explanation: "Restrictive networks often allow only web ports. An SSL VPN on TCP 443 is the usual fallback.",
      },
    ],
    scenario: {
      id: "vpn-scenario-overlap",
      title: "New hire can't reach anything over the VPN",
      ticket: {
        requester: "New staff member",
        client: "Architecture firm",
        priority: "Medium",
        summary: "VPN says connected but I can't open the project drive or the CAD licence server.",
        symptoms: [
          "Other remote staff are working normally.",
          "Office LAN is 192.168.0.0/24.",
          "The user's home router is a common ISP model.",
        ],
        environment: ["SSL VPN on the office firewall", "File server 192.168.0.20", "Licence server 192.168.0.25"],
        recentChanges: ["User started this week."],
      },
      steps: [
        {
          id: "vpn-s1",
          prompt: "What do you ask the user to run first?",
          options: [
            { text: "`ipconfig /all` to see their home network's address range and the VPN adapter's settings.", correct: true, feedback: "Right. If their home network is also 192.168.0.x, you've found it." },
            { text: "Reinstall the VPN client.", correct: false, feedback: "The VPN connects; reinstalling won't change routing." },
            { text: "Reset their password.", correct: false, feedback: "They've authenticated successfully." },
          ],
        },
        {
          id: "vpn-s2",
          prompt: "Their home Wi-Fi adapter is 192.168.0.14/24, the same range as the office. What's the quick workaround and the real fix?",
          options: [
            { text: "Workaround: change the home router's LAN range (e.g. to 192.168.77.0/24). Real fix: plan to renumber the office to an uncommon range such as 10.42.0.0/24.", correct: true, feedback: "Correct. The workaround gets the user going; renumbering prevents the next hire hitting the same problem." },
            { text: "Add a static route on the user's laptop to 192.168.0.0/24.", correct: false, feedback: "That would break their own home network, and it's fragile." },
            { text: "Turn on full tunnelling.", correct: false, feedback: "The local subnet still wins; full tunnel doesn't solve a clash with the LAN they're sitting on." },
          ],
        },
        {
          id: "vpn-s3",
          prompt: "You raise a project to renumber the office. What must be planned alongside it?",
          options: [
            { text: "DHCP scopes and reservations, static devices (printers, NAS, servers), DNS records, firewall rules/objects, site-to-site VPN subnets and the network documentation.", correct: true, feedback: "Yes. Renumbering touches everything that refers to an address, so inventory it first." },
            { text: "Only the DHCP scope.", correct: false, feedback: "Static devices, DNS, firewall rules and VPNs all reference addresses too." },
            { text: "Nothing; it can be done in five minutes on the firewall.", correct: false, feedback: "Renumbering without a plan causes an outage." },
          ],
        },
      ],
      resolution: "The user's home network used the same 192.168.0.0/24 range as the office. Changing the home router's range fixed it immediately, and an office renumbering project was raised to prevent repeats.",
      ticketNote: "Cause: subnet overlap, home LAN 192.168.0.0/24 = office LAN. Workaround: user's home router LAN changed to 192.168.77.0/24; VPN access confirmed (P: drive, licence server). Raised project to renumber office to 10.42.0.0/24 to prevent recurrence.",
    },
    sources: [
      { title: "RFC 7296: Internet Key Exchange Protocol Version 2 (IKEv2)", url: "https://www.rfc-editor.org/rfc/rfc7296", supports: ["IKEv2 on UDP 500 and 4500"] },
      { title: "RFC 4303: IP Encapsulating Security Payload (ESP)", url: "https://www.rfc-editor.org/rfc/rfc4303", supports: ["ESP encryption"] },
      { title: "WireGuard: Protocol & Cryptography", url: "https://www.wireguard.com/protocol/", supports: ["WireGuard over UDP"] },
    ],
  },

  // 8 ────────────────────────────────────────────────────────────── Wi-Fi
  {
    id: "net-wifi",
    order: 8,
    title: "Wi-Fi for Business Networks",
    shortTitle: "Wi-Fi",
    summary: "Bands, channels, security modes and roaming: the things behind most 'Wi-Fi is bad' complaints.",
    whyItMatters:
      "Wi-Fi is the network most users actually touch, and the source of many vague complaints. Knowing bands, channel planning and security modes turns 'it's slow' into a specific fix.",
    prerequisites: ["VLANs and Switching"],
    objectives: [
      "Compare the 2.4, 5 and 6 GHz bands.",
      "Plan non-overlapping channels and explain interference.",
      "Choose between WPA2/WPA3 Personal and Enterprise.",
      "Map SSIDs to VLANs and troubleshoot roaming and coverage.",
    ],
    sections: [
      {
        id: "wifi-bands",
        title: "Bands and channels",
        body:
          "| Band | Range | Speed | Notes |\n|---|---|---|---|\n| **2.4 GHz** | Longest | Lowest | Only **3 non-overlapping channels: 1, 6 and 11**. Crowded; microwaves and Bluetooth interfere. |\n| **5 GHz** | Shorter | Higher | Many more channels; some are **DFS** channels that must move if radar is detected. |\n| **6 GHz** (Wi-Fi 6E/7) | Shortest | Highest | Lots of clean spectrum; only newer devices support it. |\n\nNeighbouring access points should use **different channels**. Two APs on the same channel share airtime (co-channel interference); on overlapping channels they corrupt each other. Use 20 MHz channels on 2.4 GHz, and in busy buildings prefer 20 or 40 MHz on 5 GHz over 80 MHz.",
      },
      {
        id: "wifi-security",
        title: "Security modes",
        body:
          "- **WPA2/WPA3-Personal** uses one shared password. Fine for small sites and guest networks, but everyone shares the key, and changing it means updating every device.\n- **WPA3-Personal** replaces the old pre-shared key handshake with **SAE**, which resists offline password-guessing.\n- **WPA2/WPA3-Enterprise (802.1X)** authenticates each user or device individually against a **RADIUS** server (e.g. Microsoft NPS or a cloud RADIUS service). Leavers are removed centrally and no shared password exists. This is preferred for staff networks in larger businesses.\n\nAvoid WEP and WPA (TKIP) entirely. Guest networks should be **isolated** (client isolation plus their own VLAN) and may use a captive portal.",
      },
      {
        id: "wifi-design",
        title: "SSIDs, VLANs and roaming",
        body:
          "Each SSID maps to a VLAN: Staff → VLAN 10, Guest → VLAN 30, and so on. The AP's switch port is a **trunk** carrying those VLANs. Keep the number of SSIDs low (3–4 at most), because each one adds beacon overhead on every channel.\n\n**Roaming**: the client decides when to move to a better AP. Devices that cling to a far-away AP ('sticky clients') get slow. Help them with sensible AP power levels (not all at maximum), **802.11k/v/r** (neighbour reports, steering hints and fast roaming), and enough overlap between APs.\n\nFor voice and video, aim for a signal of about **-67 dBm or better** everywhere people work.",
      },
      {
        id: "wifi-troubleshoot",
        title: "Troubleshooting Wi-Fi complaints",
        body:
          "Ask: **where, when, which devices?** Then check:\n\n1. **Signal strength (RSSI) and noise** at the user's location: `netsh wlan show interfaces` shows signal, channel, band and the AP's BSSID.\n2. **Channel utilisation** on the AP: is the channel congested by neighbours?\n3. **Which AP and band** the device is on: a laptop on 2.4 GHz to a distant AP is a roaming/band problem.\n4. **Client count** per AP.\n5. If the signal is good but the experience is bad, it's probably **not Wi-Fi**: check DHCP, DNS and the internet link.\n\nNew walls, metal shelving and fish tanks change coverage. A site survey (even a free phone app) beats guessing.",
      },
    ],
    keyTerms: [
      { term: "SSID", definition: "The network name broadcast by access points." },
      { term: "BSSID", definition: "The MAC address of a specific AP radio; tells you which AP a device is connected to." },
      { term: "Non-overlapping channels", definition: "On 2.4 GHz, channels 1, 6 and 11." },
      { term: "DFS", definition: "Dynamic Frequency Selection: 5 GHz channels that must vacate if radar is detected." },
      { term: "SAE", definition: "Simultaneous Authentication of Equals: WPA3-Personal's handshake, resistant to offline guessing." },
      { term: "802.1X / RADIUS", definition: "Per-user or per-device Wi-Fi authentication used by WPA2/WPA3-Enterprise." },
      { term: "RSSI", definition: "Received signal strength, in dBm; closer to 0 is stronger (-55 is better than -75)." },
      { term: "Sticky client", definition: "A device that stays connected to a distant AP instead of roaming to a closer one." },
    ],
    commands: [
      { command: "netsh wlan show interfaces", purpose: "Show SSID, BSSID, band, channel and signal for the current connection." },
      { command: "netsh wlan show wlanreport", purpose: "Generate an HTML report of recent Wi-Fi sessions and disconnects." },
      { command: "netsh wlan show networks mode=bssid", purpose: "List nearby networks with their channels and signal." },
    ],
    commonMistakes: [
      "Using 2.4 GHz channels other than 1, 6 and 11 so neighbouring APs overlap.",
      "Setting every AP to maximum power, which makes clients stick to far-away APs.",
      "Running one shared staff Wi-Fi password for years and never changing it when people leave.",
      "Creating an SSID for every purpose, wasting airtime on beacons.",
      "Blaming Wi-Fi when the signal is excellent and the real fault is DNS or the internet link.",
    ],
    flashcards: [
      { id: "wifi-fc-1", front: "Non-overlapping 2.4 GHz channels?", back: "1, 6 and 11." },
      { id: "wifi-fc-2", front: "Trade-off between 2.4 GHz and 5 GHz?", back: "2.4 GHz reaches further but is slower and more crowded; 5 GHz is faster with more channels but shorter range." },
      { id: "wifi-fc-3", front: "Personal vs Enterprise Wi-Fi security?", back: "Personal: one shared password. Enterprise: each user/device authenticates via 802.1X to a RADIUS server." },
      { id: "wifi-fc-4", front: "What does WPA3-Personal use instead of the old PSK handshake?", back: "SAE (Simultaneous Authentication of Equals)." },
      { id: "wifi-fc-5", front: "Target signal for voice/video?", back: "About -67 dBm or stronger." },
      { id: "wifi-fc-6", front: "How do SSIDs reach different VLANs?", back: "Each SSID is tagged with a VLAN on the AP, and the AP's switch port is a trunk carrying those VLANs." },
    ],
    quiz: [
      {
        id: "wifi-q1",
        question: "Three APs in an open-plan office are on 2.4 GHz channels 1, 3 and 6. What's wrong?",
        options: [
          "Nothing",
          "Channel 3 overlaps both 1 and 6; use 1, 6 and 11",
          "They should all use channel 6",
          "2.4 GHz should never be used",
        ],
        answerIndex: 1,
        explanation: "Only 1, 6 and 11 don't overlap on 2.4 GHz. Channel 3 interferes with its neighbours.",
      },
      {
        id: "wifi-q2",
        question: "A staff member left on bad terms and knew the office Wi-Fi password. What's the better long-term design?",
        options: [
          "Hide the SSID",
          "WPA2/WPA3-Enterprise with 802.1X so each account is authenticated and can be disabled",
          "MAC address filtering",
          "Switch to WEP",
        ],
        answerIndex: 1,
        explanation: "Hidden SSIDs and MAC filtering are easily bypassed. Enterprise authentication ties access to individual accounts.",
      },
      {
        id: "wifi-q3",
        question: "A laptop in the boardroom has slow Wi-Fi. `netsh wlan show interfaces` shows 2.4 GHz, signal 38%, BSSID of the reception AP. What's likely happening?",
        options: [
          "The DHCP scope is full",
          "The laptop is a sticky client still connected to a distant AP",
          "DNS is misconfigured",
          "The firewall is blocking it",
        ],
        answerIndex: 1,
        explanation: "It's on a far-away AP on the weaker band. Tune AP power and enable 802.11k/v/r so it roams to the boardroom AP.",
      },
      {
        id: "wifi-q4",
        question: "Users have full signal but websites won't load. What's the next step?",
        options: [
          "Add another AP",
          "Check IP addressing, DNS and the internet link, because the radio side looks fine",
          "Change the SSID name",
          "Switch every AP to channel 11",
        ],
        answerIndex: 1,
        explanation: "Good signal means the wireless link is probably fine. Move up the stack: address, gateway, DNS, internet.",
      },
      {
        id: "wifi-q5",
        question: "Why should you avoid having many SSIDs?",
        options: [
          "Each SSID adds beacon overhead on the channel, reducing usable airtime",
          "Devices can only remember three networks",
          "SSIDs use up IP addresses",
          "It breaks DHCP",
        ],
        answerIndex: 0,
        explanation: "Every SSID beacons several times a second on every radio, consuming airtime even when nobody's using it.",
      },
    ],
    scenario: {
      id: "wifi-scenario-calls",
      title: "Teams calls drop in the back office",
      ticket: {
        requester: "Customer service team leader",
        client: "Insurance broker",
        priority: "Medium",
        summary: "Teams calls on laptops keep dropping when staff walk to the back office.",
        symptoms: [
          "Calls are fine at the front desks.",
          "In the back office, laptops show 1–2 bars.",
          "A new compactus (metal shelving) was installed last month.",
        ],
        environment: ["Two ceiling APs (front and back)", "WPA2-Personal staff SSID", "All APs at maximum power"],
        recentChanges: ["Metal compactus installed between the front and back offices."],
      },
      steps: [
        {
          id: "wifi-s1",
          prompt: "What do you gather first from an affected laptop in the back office?",
          options: [
            { text: "`netsh wlan show interfaces`: which AP (BSSID), band, channel and signal it's using there.", correct: true, feedback: "Right. You need to know whether it's connected to the near AP or clinging to the front one." },
            { text: "Reinstall Teams.", correct: false, feedback: "Calls are fine at the front, so the app isn't the problem." },
            { text: "Run an internet speed test at the front desk.", correct: false, feedback: "The problem is location-specific; test where it happens." },
          ],
        },
        {
          id: "wifi-s2",
          prompt: "Laptops in the back are still on the front AP at -78 dBm, even though the back AP is closer. What do you change?",
          options: [
            { text: "Lower AP transmit power from maximum, enable 802.11k/v/r on the staff SSID, and confirm the back AP's coverage behind the compactus.", correct: true, feedback: "Correct. Balanced power and roaming assistance help clients move to the nearest AP." },
            { text: "Increase the front AP to even higher power.", correct: false, feedback: "That makes clients cling to it even more." },
            { text: "Change the SSID password.", correct: false, feedback: "Security settings don't affect roaming here." },
          ],
        },
        {
          id: "wifi-s3",
          prompt: "Roaming is better, but one corner behind the compactus still reads -74 dBm. What's the right recommendation?",
          options: [
            { text: "Quote an additional AP (or relocate the back AP) based on a quick survey, since metal shelving blocks signal and -67 dBm or better is needed for reliable calls.", correct: true, feedback: "Yes. Physical obstructions need coverage changes; back the recommendation with survey readings." },
            { text: "Tell staff to avoid that corner.", correct: false, feedback: "Not a fix, and the business needs that space." },
            { text: "Switch the whole site to 2.4 GHz for range.", correct: false, feedback: "2.4 GHz is more congested and slower; it trades one problem for another." },
          ],
        },
      ],
      resolution: "New metal shelving blocked the path between APs and maximum power settings caused sticky clients. Power was rebalanced and 802.11k/v/r enabled, and an extra AP was recommended for the remaining weak corner.",
      ticketNote: "Cause: compactus blocking signal plus sticky clients (APs at max power). Reduced AP Tx power, enabled 802.11k/v/r on Staff SSID. Back office now -60 to -65 dBm on back AP; NE corner -74 dBm. Quoted extra AP (Q-1182). Teams test calls stable after change.",
    },
    sources: [
      { title: "Wi-Fi Alliance: Security", url: "https://www.wi-fi.org/discover-wi-fi/security", supports: ["WPA3", "Personal vs Enterprise", "SAE"] },
      { title: "Wi-Fi Alliance: Wi-Fi CERTIFIED 6", url: "https://www.wi-fi.org/discover-wi-fi/wi-fi-certified-6", supports: ["Wi-Fi 6 and 6 GHz (Wi-Fi 6E)"] },
    ],
  },

  // 9 ───────────────────────────────────────────────────── Troubleshooting
  {
    id: "net-troubleshooting",
    order: 9,
    title: "Network Troubleshooting Method",
    shortTitle: "Troubleshooting",
    summary: "A repeatable, layer-by-layer way to find network faults, and the tools to do it.",
    whyItMatters:
      "Knowing facts isn't enough; you need a method. Working bottom-up with the right tools turns a vague 'internet is broken' into a precise cause, fast, and makes your ticket notes useful.",
    prerequisites: ["DHCP in Depth", "DNS for MSP Technicians", "Routing and Default Gateways"],
    objectives: [
      "Scope a problem before touching anything.",
      "Work through the layers in order: physical, IP, gateway, DNS, application.",
      "Use ipconfig, ping, tracert, nslookup, arp and Test-NetConnection deliberately.",
      "Write ticket notes that record evidence and the fix.",
    ],
    sections: [
      {
        id: "ts-scope",
        title: "Scope first",
        body:
          "Before fixing anything, find out **how big the problem is**:\n\n- **One user, a group, or everyone?** One PC points to the device or its cable; a whole floor points to a switch; everyone points to the core, the firewall or the ISP.\n- **One application or everything?** Only Outlook failing is very different from nothing loading.\n- **Since when, and what changed?** Updates, new equipment, moved desks and ISP work are the usual suspects.\n\nThen **reproduce it** yourself if you can. Change **one thing at a time**, and write down what you did.",
      },
      {
        id: "ts-layers",
        title: "Bottom-up: the layer-by-layer check",
        body:
          "Work upwards; each step depends on the one before it.\n\n1. **Physical/link**: is the cable plugged in, link light on, Wi-Fi connected? (`ipconfig` shows 'Media disconnected' if not.)\n2. **IP address**: does it have a valid address for this network? 169.254.x.x = DHCP problem. (`ipconfig /all`)\n3. **Local stack**: `ping 127.0.0.1` tests TCP/IP on the PC itself.\n4. **Gateway**: `ping <default gateway>`. If that fails, the problem is local (VLAN, switch, cable, Wi-Fi).\n5. **Beyond the gateway by IP**: `ping 1.1.1.1`. If the gateway works but this fails, look at the firewall/ISP.\n6. **DNS**: `nslookup microsoft.com`. If IPs work but names don't, it's DNS.\n7. **The application/port**: `Test-NetConnection server -Port 443`, then the app itself.\n\nThe first step that fails tells you where to dig.",
      },
      {
        id: "ts-tools",
        title: "The toolkit",
        body:
          "| Tool | Use it to… |\n|---|---|\n| `ipconfig /all` | See address, mask, gateway, DNS servers, DHCP server and lease |\n| `ping` | Test basic reachability (ICMP may be blocked by some firewalls) |\n| `tracert` / `pathping` | Find where along the path traffic stops, or where loss occurs |\n| `nslookup` / `Resolve-DnsName` | Test DNS, against a specific server if needed |\n| `arp -a` | See which MAC address answered for an IP; spot duplicate-IP conflicts |\n| `Test-NetConnection -Port` | Test a specific TCP port |\n| `netstat -ano` | See listening ports and connections on a machine |\n| **Wireshark** | Capture packets: filter with `dns`, `dhcp`, `tcp.port == 443` or `arp` |\n\nCapture packets only with permission and on systems you're responsible for, as captures can contain sensitive data.",
      },
      {
        id: "ts-notes",
        title: "Writing it down",
        body:
          "Good ticket notes help the next technician, and you in six months. Record:\n\n- **Symptom and scope**: who, what and since when.\n- **Evidence**: what you tested and the actual results (\"ping gateway OK, ping 1.1.1.1 OK, nslookup fails → DNS\").\n- **Cause**: the root cause, not just the symptom.\n- **Fix**: what you changed, exactly (port, setting, value).\n- **Verification**: how you proved it's fixed.\n- **Follow-up**: anything recommended to prevent a repeat.\n\nAvoid notes like 'fixed network'. They're useless the next time it happens.",
      },
    ],
    keyTerms: [
      { term: "Scoping", definition: "Working out how many users, devices or applications are affected before troubleshooting." },
      { term: "Bottom-up troubleshooting", definition: "Checking physical, then addressing, then gateway, then DNS, then the application, in order." },
      { term: "Loopback test", definition: "ping 127.0.0.1, which tests the device's own TCP/IP stack." },
      { term: "Duplicate IP", definition: "Two devices using one address; arp -a can show the MAC that answered." },
      { term: "Packet capture", definition: "Recording network traffic (e.g. with Wireshark) to see exactly what's sent and received." },
    ],
    commands: [
      { command: "ipconfig /all", purpose: "Full addressing details for every adapter." },
      { command: "ping 127.0.0.1 → ping <gateway> → ping 1.1.1.1", purpose: "Test the local stack, then the gateway, then the internet by IP." },
      { command: "nslookup microsoft.com", purpose: "Test name resolution." },
      { command: "Test-NetConnection outlook.office365.com -Port 443", purpose: "Test reaching a specific service port." },
      { command: "arp -a", purpose: "Show IP-to-MAC mappings learned on this network." },
      { command: "Get-NetIPConfiguration", purpose: "PowerShell summary of addresses, gateways and DNS per adapter." },
    ],
    commonMistakes: [
      "Rebooting the router first, before gathering evidence, and destroying the logs.",
      "Changing several things at once, so you never learn what fixed it.",
      "Skipping scoping and spending an hour on one PC when the whole site is affected.",
      "Treating a failed ping as proof a host is down, when ICMP may simply be blocked.",
      "Writing 'fixed' with no cause or evidence in the ticket.",
    ],
    flashcards: [
      { id: "ts-fc-1", front: "First question when 'the internet is down'?", back: "How many people/devices are affected, and since when? (Scope.)" },
      { id: "ts-fc-2", front: "Ping the gateway works, ping 1.1.1.1 works, websites don't load. Likely cause?", back: "DNS." },
      { id: "ts-fc-3", front: "What does ping 127.0.0.1 test?", back: "The device's own TCP/IP stack (loopback)." },
      { id: "ts-fc-4", front: "Which command shows the DHCP server a PC used?", back: "ipconfig /all." },
      { id: "ts-fc-5", front: "Wireshark display filter for DNS traffic?", back: "dns" },
      { id: "ts-fc-6", front: "Why change only one thing at a time?", back: "So you know which change actually fixed (or broke) it." },
    ],
    quiz: [
      {
        id: "ts-q1",
        question: "A user can ping 1.1.1.1 but can't open any websites by name. Where is the fault?",
        options: ["Physical cabling", "DHCP", "DNS", "The Wi-Fi channel"],
        answerIndex: 2,
        explanation: "Reaching an internet IP proves addressing, gateway and the ISP link. Names failing means DNS.",
      },
      {
        id: "ts-q2",
        question: "Everyone in the office lost the internet at 10:15. What's the most sensible first step?",
        options: [
          "Reimage the first PC that reported it",
          "Check the firewall and ISP link status, since a site-wide problem points to shared equipment",
          "Flush DNS on every PC",
          "Replace the user's network cable",
        ],
        answerIndex: 1,
        explanation: "Scope tells you where to look: everyone at once means the core, firewall or ISP, not individual PCs.",
      },
      {
        id: "ts-q3",
        question: "`ping <gateway>` fails from one PC, but it has a valid address and others on the same switch are fine. What next?",
        options: [
          "Check the PC's cable, switch port and VLAN, and its firewall/ARP table",
          "Call the ISP",
          "Change the DNS servers",
          "Lower the DHCP lease time",
        ],
        answerIndex: 0,
        explanation: "The problem is local to that device or its connection, since its neighbours reach the gateway fine.",
      },
      {
        id: "ts-q4",
        question: "Which is the most useful ticket note?",
        options: [
          "Fixed network.",
          "Rebooted stuff, works now.",
          "Scope: 1 user. ping GW OK, ping 1.1.1.1 OK, nslookup failed (DNS set to old DC 10.0.10.4). Changed NIC DNS to DHCP. nslookup OK, user confirmed.",
          "User error.",
        ],
        answerIndex: 2,
        explanation: "It records scope, evidence, cause, the exact fix and verification.",
      },
      {
        id: "ts-q5",
        question: "Two PCs keep dropping off the network alternately. `arp -a` on the server shows the IP's MAC address changing. What does that suggest?",
        options: [
          "A duplicate IP address",
          "A DNS TTL issue",
          "Wrong Wi-Fi channel",
          "An SPF failure",
        ],
        answerIndex: 0,
        explanation: "Two devices answering for the same IP make its MAC flip in ARP tables, and each knocks the other off.",
      },
    ],
    scenario: {
      id: "ts-scenario-friday",
      title: "\"The internet's down\" — one user, Friday afternoon",
      ticket: {
        requester: "Sales rep",
        client: "Property management agency",
        priority: "Medium",
        summary: "Internet not working on my PC. Everyone else seems fine.",
        symptoms: ["Browser shows 'This site can't be reached'.", "Teams shows offline."],
        environment: ["Wired desk PC", "Office DNS on the domain controller 10.0.10.5"],
        recentChanges: ["User says someone from IT 'fixed something' on their PC last week."],
      },
      steps: [
        {
          id: "ts-s1",
          prompt: "You've confirmed it's only this PC. What's your first test?",
          options: [
            { text: "`ipconfig /all` to check the address, gateway and DNS servers.", correct: true, feedback: "Right. Start with the facts about how the PC is configured before testing connectivity." },
            { text: "Reboot the firewall.", correct: false, feedback: "Everyone else is fine, so the firewall isn't the problem and a reboot would disconnect them." },
            { text: "Reinstall the browser.", correct: false, feedback: "Teams is down too, so it's not the browser." },
          ],
        },
        {
          id: "ts-s2",
          prompt: "Address 10.0.10.77/24, gateway 10.0.10.1, DNS server 8.8.8.8 (static). `ping 10.0.10.1` and `ping 1.1.1.1` both work. What do you test next?",
          options: [
            { text: "`nslookup microsoft.com`, and also an internal name like `nslookup dc01`, to test DNS.", correct: true, feedback: "Correct. IP connectivity works, so test names next, both public and internal." },
            { text: "Replace the network cable.", correct: false, feedback: "Pings succeed, so the physical link is fine." },
            { text: "Run tracert to 1.1.1.1.", correct: false, feedback: "You can already reach 1.1.1.1; the path isn't the issue." },
          ],
        },
        {
          id: "ts-s3",
          prompt: "Public names fail too. You notice the static DNS of 8.8.8.8 was set manually, and a firewall rule only allows DNS from the domain controller. What's the fix?",
          options: [
            { text: "Set the adapter back to obtain DNS automatically (via DHCP, pointing to the DC), test both public and internal names, and note who/what set the static DNS.", correct: true, feedback: "Yes. Domain PCs should use the DCs for DNS; that also fixes internal names and matches the firewall's DNS policy." },
            { text: "Add a firewall rule allowing this PC to reach 8.8.8.8.", correct: false, feedback: "That makes the misconfiguration permanent and still breaks internal names and AD." },
            { text: "Change it to 1.1.1.1 instead.", correct: false, feedback: "Same problem: domain PCs must use internal DNS." },
          ],
        },
      ],
      resolution: "A static public DNS server had been set on the PC, but the firewall only allows DNS from the domain controller. The adapter was returned to DHCP-assigned DNS and both public and internal resolution were verified.",
      ticketNote: "Scope: 1 PC. ipconfig: static DNS 8.8.8.8. ping GW and 1.1.1.1 OK; nslookup fails (FW allows DNS only from DC). Set NIC to DHCP DNS (10.0.10.5). nslookup microsoft.com and dc01 OK, Teams online, user confirmed. Note: check RMM history for who set static DNS.",
    },
    sources: [
      { title: "Microsoft Learn: ipconfig", url: "https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/ipconfig", supports: ["ipconfig /all, /release, /renew, /flushdns"] },
      { title: "Microsoft Learn: nslookup", url: "https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/nslookup", supports: ["DNS lookups against specific servers"] },
      { title: "Microsoft Learn: arp", url: "https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/arp", supports: ["Viewing the ARP cache"] },
      { title: "Wireshark User's Guide", url: "https://www.wireshark.org/docs/wsug_html_chunked/", supports: ["Packet capture and display filters"] },
    ],
  },

  // 10 ─────────────────────────────────────────────────── AD / Microsoft 365
  {
    id: "net-ad-m365",
    order: 10,
    title: "Active Directory and Microsoft 365 Networking",
    shortTitle: "AD & M365",
    summary: "The network plumbing Active Directory and Microsoft 365 depend on: DNS, time, ports and endpoints.",
    whyItMatters:
      "Most MSP clients run Active Directory, Microsoft 365 or both. Login failures, slow logons, broken trust relationships and Outlook problems are very often networking problems in disguise.",
    prerequisites: ["DNS for MSP Technicians", "Common Ports and Protocols"],
    objectives: [
      "Explain why domain-joined devices must use the domain controllers for DNS.",
      "Explain the Kerberos time requirement and check time sync.",
      "List the key AD ports and test domain controller discovery.",
      "Describe the Microsoft 365 DNS records and network guidance, and what hybrid join needs.",
    ],
    sections: [
      {
        id: "ad-dns",
        title: "AD lives on DNS",
        body:
          "Domain-joined computers find domain controllers by looking up **SRV records** such as `_ldap._tcp.dc._msdcs.corp.example`. Those records exist only in the **internal AD DNS** zone.\n\nSo the rule is: **domain members must use the domain controllers (or DNS servers that forward to them) as their only DNS servers.** Never add 8.8.8.8 or 1.1.1.1 as a second DNS server on a domain PC, because Windows may ask it first and fail to find the domain. That causes slow logons, Group Policy failures and 'domain not available'.\n\nThe DCs themselves forward external lookups to the internet (via forwarders or root hints), so clients still reach public sites through them.",
      },
      {
        id: "ad-time",
        title: "Time matters: Kerberos",
        body:
          "AD authentication uses **Kerberos**, which by default rejects tickets if the client's clock differs from the DC's by more than **5 minutes**. Symptoms: sudden login failures, 'the trust relationship failed', access-denied errors.\n\nTime flows down a hierarchy: the DC holding the **PDC emulator** role syncs to a reliable external source, the other DCs sync to it, and members sync to the DCs.\n\nUseful checks: `w32tm /query /status` (where this machine gets time and when it last synced) and `w32tm /resync`. Virtual DCs shouldn't also take time from the hypervisor host, or the two sources fight.",
      },
      {
        id: "ad-ports",
        title: "Ports and DC discovery",
        body:
          "Clients talking to domain controllers need (at least):\n\n| Port | Service |\n|---|---|\n| 53 | DNS |\n| 88 | Kerberos |\n| 135 + 49152–65535 | RPC endpoint mapper + dynamic RPC |\n| 389 / 636 | LDAP / LDAPS |\n| 445 | SMB (Group Policy and SYSVOL) |\n| 3268 / 3269 | Global Catalog |\n| 123 (UDP) | Time |\n\nBetween sites, or through a firewall to a DC, all of these must be allowed. Test discovery with `nltest /dsgetdc:corp.example` and check DC health with `dcdiag`.",
      },
      {
        id: "ad-m365",
        title: "Microsoft 365 and hybrid identity",
        body:
          "**DNS records** for Microsoft 365 email: an **MX** to `<domain>.mail.protection.outlook.com`, a **CNAME** `autodiscover` → `autodiscover.outlook.com`, and an SPF **TXT** including `spf.protection.outlook.com`. The admin centre shows the exact values to use.\n\n**Network guidance**: Microsoft publishes the URLs and IP ranges Microsoft 365 uses, and recommends letting this traffic go **directly** to the internet: no SSL inspection or proxying of the 'Optimize' endpoints, and no forcing it through VPNs. Breaking or inspecting it causes Teams call quality and Outlook connection problems.\n\n**Hybrid join** (on-premises AD devices also registered in Microsoft Entra ID) needs the device to reach Microsoft's registration endpoints and the domain to have a configured Service Connection Point. Devices that can't reach those endpoints never finish joining.",
      },
    ],
    keyTerms: [
      { term: "Domain controller (DC)", definition: "A server running AD DS that authenticates users and devices and usually runs internal DNS." },
      { term: "SRV records (_msdcs)", definition: "DNS records clients use to locate domain controllers and services." },
      { term: "Kerberos clock skew", definition: "The maximum time difference allowed between client and DC; 5 minutes by default." },
      { term: "PDC emulator", definition: "The FSMO role that acts as the authoritative time source for the domain." },
      { term: "Global Catalog", definition: "A DC holding a searchable partial copy of every object in the forest; ports 3268/3269." },
      { term: "Hybrid join", definition: "A device joined to on-premises AD and also registered in Microsoft Entra ID." },
      { term: "Optimize endpoints", definition: "Microsoft 365 traffic Microsoft says should bypass proxies, inspection and VPNs." },
    ],
    commands: [
      { command: "nltest /dsgetdc:corp.example", purpose: "Find which domain controller this machine locates." },
      { command: "nslookup -type=srv _ldap._tcp.dc._msdcs.corp.example", purpose: "Check the DC SRV records resolve." },
      { command: "w32tm /query /status", purpose: "Show the time source and last successful sync." },
      { command: "dcdiag /v", purpose: "Run domain controller health tests." },
      { command: "dsregcmd /status", purpose: "Show a device's Entra ID / hybrid join state." },
      { command: "gpresult /r", purpose: "Show which Group Policies applied, and from which DC." },
    ],
    commonMistakes: [
      "Adding 8.8.8.8 as a secondary DNS server on domain PCs or on the DHCP scope.",
      "Letting virtual DCs take time from the hypervisor as well as the domain hierarchy.",
      "Blocking dynamic RPC ports between sites, so replication and some admin tools fail.",
      "SSL-inspecting Teams and Exchange Online traffic on the firewall.",
      "Forgetting the autodiscover CNAME after an email migration, leaving Outlook prompting for settings.",
    ],
    flashcards: [
      { id: "ad-fc-1", front: "What DNS servers should a domain-joined PC use?", back: "Only the domain controllers (or DNS servers that forward to AD DNS)." },
      { id: "ad-fc-2", front: "Default maximum Kerberos clock skew?", back: "5 minutes." },
      { id: "ad-fc-3", front: "Which DC role is the domain's authoritative time source?", back: "The PDC emulator." },
      { id: "ad-fc-4", front: "Which command shows a machine's time source and last sync?", back: "w32tm /query /status." },
      { id: "ad-fc-5", front: "Global Catalog ports?", back: "3268 (LDAP) and 3269 (LDAP over TLS)." },
      { id: "ad-fc-6", front: "Microsoft 365 autodiscover record?", back: "CNAME autodiscover → autodiscover.outlook.com." },
      { id: "ad-fc-7", front: "Which command shows a device's hybrid join state?", back: "dsregcmd /status." },
    ],
    quiz: [
      {
        id: "ad-q1",
        question: "Domain PCs have slow logons and Group Policy sometimes fails. DHCP hands out DNS servers 10.0.10.5 (DC) and 8.8.8.8. What's the fix?",
        options: [
          "Add 1.1.1.1 as a third DNS server",
          "Remove 8.8.8.8 so clients use only the DC(s); the DCs forward external lookups",
          "Increase the lease time",
          "Disable Group Policy",
        ],
        answerIndex: 1,
        explanation: "Public resolvers don't know the internal AD zone. Clients asking 8.8.8.8 can't find DCs via SRV records.",
      },
      {
        id: "ad-q2",
        question: "Several users suddenly can't log in with Kerberos errors. A DC's clock is 9 minutes ahead. Why does that matter?",
        options: [
          "It doesn't",
          "Kerberos rejects authentication when clocks differ by more than 5 minutes by default",
          "DHCP leases expire early",
          "DNS TTLs are affected",
        ],
        answerIndex: 1,
        explanation: "Kerberos tickets are time-stamped; clock skew beyond the 5-minute tolerance causes authentication failures.",
      },
      {
        id: "ad-q3",
        question: "Which record do Windows clients use to locate a domain controller?",
        options: [
          "MX record",
          "SRV record such as _ldap._tcp.dc._msdcs.<domain>",
          "PTR record for the DC",
          "TXT record with v=spf1",
        ],
        answerIndex: 1,
        explanation: "DCs register SRV records in AD DNS; clients query them to find a DC.",
      },
      {
        id: "ad-q4",
        question: "Teams calls are poor only in the office. The firewall does SSL inspection on all traffic. What does Microsoft recommend?",
        options: [
          "Inspect Teams traffic more aggressively",
          "Exclude Microsoft 365 'Optimize' endpoints from SSL inspection and proxying, and send them directly",
          "Route Teams through the VPN",
          "Block UDP so Teams uses TCP",
        ],
        answerIndex: 1,
        explanation: "Microsoft's network guidance says Optimize-category traffic should bypass inspection and proxies for performance.",
      },
      {
        id: "ad-q5",
        question: "Which command quickly confirms which domain controller a computer is using?",
        options: ["ipconfig /flushdns", "nltest /dsgetdc:<domain>", "tracert <domain>", "arp -a"],
        answerIndex: 1,
        explanation: "nltest /dsgetdc runs DC discovery and shows the DC found, its site and flags.",
      },
    ],
    scenario: {
      id: "ad-scenario-trust",
      title: "\"The trust relationship between this workstation and the primary domain failed\"",
      ticket: {
        requester: "Reception",
        client: "Medical centre",
        priority: "High",
        summary: "Several PCs show a trust relationship error at login after the weekend power outage.",
        symptoms: [
          "Errors started Monday morning on several PCs.",
          "Cached logins work on some machines.",
          "A single virtual DC runs on the on-site host.",
        ],
        environment: ["One Hyper-V host running DC01 (also DNS)", "PCs get DNS from DHCP"],
        recentChanges: ["Power outage over the weekend; the host was restarted manually."],
      },
      steps: [
        {
          id: "ad-s1",
          prompt: "Before resetting any computer accounts, what do you check on DC01?",
          options: [
            { text: "Its clock and time source (`w32tm /query /status`), compared with the PCs and real time.", correct: true, feedback: "Right. A host restarted after a power cut can come up with a wrong clock, and Kerberos fails beyond 5 minutes of skew, which looks like trust errors." },
            { text: "Rejoin every PC to the domain.", correct: false, feedback: "That's slow, disruptive and won't help if the DC's time is wrong." },
            { text: "Reinstall DC01.", correct: false, feedback: "Far too drastic before basic checks." },
          ],
        },
        {
          id: "ad-s2",
          prompt: "DC01's clock is 2 hours behind and its source is 'VM IC Time Synchronization Provider' (the host). What do you do?",
          options: [
            { text: "Correct the host's time, configure DC01 (the PDC emulator) to sync from a reliable external NTP source rather than the host, then resync and retest logins.", correct: true, feedback: "Correct. The PDC emulator should take time from a reliable external source, not the hypervisor host." },
            { text: "Set each PC's clock manually to match DC01.", correct: false, feedback: "That spreads the wrong time and doesn't fix the source." },
            { text: "Increase the Kerberos skew tolerance to 3 hours.", correct: false, feedback: "That hides the problem and weakens security." },
          ],
        },
        {
          id: "ad-s3",
          prompt: "Time is fixed and most PCs log in, but one still shows the trust error. What now?",
          options: [
            { text: "Repair that computer's secure channel, e.g. `Test-ComputerSecureChannel -Repair` (run with domain admin credentials), then confirm with `nltest /sc_verify:<domain>`.", correct: true, feedback: "Yes. Once time is right, a remaining machine may genuinely have a broken secure channel; repair it without a full rejoin." },
            { text: "Disable Kerberos on that PC.", correct: false, feedback: "That would break domain authentication entirely." },
            { text: "Ignore it; it'll fix itself.", correct: false, feedback: "A broken secure channel doesn't repair itself." },
          ],
        },
      ],
      resolution: "After the power outage, the virtual DC took a wrong time from its host, causing Kerberos failures that looked like trust errors. The PDC emulator was set to sync from external NTP, and one PC's secure channel was repaired.",
      ticketNote: "Cause: DC01 (PDC emulator, Hyper-V VM) synced time from host, which booted 2h behind after outage; Kerberos skew caused trust errors. Fixed host time; disabled VM IC time sync for DC01; w32tm configured to au.pool.ntp.org; resync OK. 1 PC still failing: Test-ComputerSecureChannel -Repair, nltest /sc_verify OK. Recommend UPS with graceful shutdown.",
    },
    sources: [
      { title: "Microsoft Learn: Integrating AD DS into an existing DNS infrastructure", url: "https://learn.microsoft.com/en-us/windows-server/identity/ad-ds/plan/dns-and-ad-ds", supports: ["AD DS depends on DNS", "Domain member DNS configuration"] },
      { title: "Microsoft Learn: Verify SRV DNS records have been created", url: "https://learn.microsoft.com/en-us/troubleshoot/windows-server/networking/verify-srv-dns-records-have-been-created", supports: ["DC locator SRV records"] },
      { title: "Microsoft Learn: Maximum tolerance for computer clock synchronization", url: "https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-10/security/threat-protection/security-policy-settings/maximum-tolerance-for-computer-clock-synchronization", supports: ["5-minute Kerberos default"] },
      { title: "Microsoft Learn: Windows Time service", url: "https://learn.microsoft.com/en-us/windows-server/networking/windows-time-service/windows-time-service-top", supports: ["Domain time hierarchy", "w32tm"] },
      { title: "Microsoft Learn: Configure firewall for AD domains and trusts", url: "https://learn.microsoft.com/en-us/troubleshoot/windows-server/active-directory/config-firewall-for-ad-domains-and-trusts", supports: ["AD port requirements"] },
      { title: "Microsoft Learn: Microsoft 365 URLs and IP address ranges", url: "https://learn.microsoft.com/en-us/microsoft-365/enterprise/urls-and-ip-address-ranges", supports: ["Microsoft 365 endpoints and Optimize category"] },
      { title: "Microsoft Learn: Configure Microsoft Entra hybrid join", url: "https://learn.microsoft.com/en-us/entra/identity/devices/how-to-hybrid-join", supports: ["Hybrid join requirements"] },
    ],
  },
];

/**
 * For apps that show lesson text as plain text rather than rendered
 * markdown: turns markdown tables into "- a — b — c" bullet lines.
 */
export function markdownTablesToLists(md: string): string {
  const out: string[] = [];
  const isRow = (line: string) => line.trim().startsWith("|") && line.trim().endsWith("|");
  const cells = (line: string) => line.trim().slice(1, -1).split("|").map((c) => c.trim());
  const lines = md.split("\n");
  for (let i = 0; i < lines.length; i++) {
    if (isRow(lines[i]) && i + 1 < lines.length && /^\s*\|[\s:|-]+\|\s*$/.test(lines[i + 1])) {
      i += 2; // skip header and separator rows
      while (i < lines.length && isRow(lines[i])) {
        out.push("- " + cells(lines[i]).filter(Boolean).join(" — "));
        i++;
      }
      i--;
    } else {
      out.push(lines[i]);
    }
  }
  return out.join("\n");
}

/**
 * For apps whose existing lessons are plain prose: tables become bullet
 * lines and **bold** / `code` markers are removed (their text is kept).
 */
export function markdownToPlainText(md: string): string {
  return markdownTablesToLists(md)
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1");
}
