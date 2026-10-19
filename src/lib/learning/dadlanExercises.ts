// Read-only "try it on DadLAN" exercises for the networking modules. They use
// networks observed on the fleet (Avance Business Technology Wi-Fi
// 10.245.173.0/24, Avance Guest Wi-Fi 10.174.174.0/24) and change nothing.
export const dadlanExercises: Record<string, string[]> = {
  "net-dhcp": [
    "On a DadLAN laptop run `ipconfig /all` and note the DHCP Server, lease obtained/expires times and the subnet.",
    "Is it on Avance Business Technology Wi-Fi (observed 10.245.173.0/24) or Avance Guest Wi-Fi (observed 10.174.174.0/24)? Write down how the address tells you.",
  ],
  "net-dns": [
    "From a laptop, run `nslookup` for a public name and note which DNS server answers.",
    "Repeat from a laptop on Guest Wi-Fi. Guest has been observed with no DNS or internet egress: what would a user report, and what is actually broken?",
  ],
  "net-vlans": [
    "Business and Guest Wi-Fi are separate, isolated subnets. Explain why a Guest-network laptop couldn't reach the ForgeGrid coordinator on port 8080 at all.",
    "Explain why an SMB mount started from the Business side to that same laptop still worked, and why that can mislead diagnosis.",
  ],
  "net-routing": [
    "Run `route print` on a laptop: which gateway handles 0.0.0.0/0, and which subnet is on-link?",
    "Explain why a host on 10.176.176.0/24 can't reach 10.245.173.58 directly without a router (the #03/#07 subnet repair).",
  ],
  "net-nat-firewall": [
    "Note the one-way behaviour between the Avance networks: Business → Guest connections can work while Guest → Business fails. Which rule or isolation setting explains that?",
    "List which DadLAN services should never be reachable from Guest Wi-Fi, and why.",
  ],
  "net-ports": [
    "From a Business-network laptop, run `Test-NetConnection <coordinator> -Port 8080` and `Test-NetConnection <laptop> -Port 445`. Record which succeed.",
    "Name the port each DadLAN tool relies on (ForgeGrid coordinator 8080, SMB 445, web dashboards 443) and whether it is TCP or UDP.",
  ],
  "net-vpn": [
    "List which DadLAN tools still reach laptops off-site (cloud-managed Action1, MeshCentral) and which need the LAN (SMB mounts).",
    "If the fleet used a VPN, which subnet ranges would have to stay unique to avoid clashing with home networks?",
  ],
  "net-wifi": [
    "On a laptop run `netsh wlan show interfaces`: which SSID, band, channel and signal is it using?",
    "Before blaming ForgeGrid pairing or credentials, confirm the laptop is on Avance Business Technology Wi-Fi, not Avance Guest.",
  ],
  "net-troubleshooting": [
    "Apply the bottom-up method to \"ForgeGrid worker can't pair\": link, address/subnet (which Wi-Fi?), gateway, DNS, then port 8080, before suspecting code or credentials.",
    "Write the ticket note you would leave if moving the laptop to Business Wi-Fi fixed it.",
  ],
  "net-ad-m365": [
    "Check whether a laptop is domain-joined or in a workgroup (`systeminfo | findstr /B Domain`) and its time source (`w32tm /query /source`).",
    "If the fleet joined an AD domain, what would have to change about each laptop's DNS servers and time source?",
  ],
};
