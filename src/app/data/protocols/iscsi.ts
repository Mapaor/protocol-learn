import { Protocol } from "../../types/protocol";

export const ISCSI: Protocol = {
  id: "iscsi",
  name: "Internet Small Computer Systems Interface (iSCSI)",
  category: "Network",
  difficulty: "Intermediate",
  shortDescription: "Encapsulation of SCSI commands over TCP/IP networks.",
  fullDescription:
    "iSCSI is a storage networking protocol that allows SCSI commands to be sent over IP networks, enabling block-level storage access over LANs, WANs, or the Internet. iSCSI uses TCP (typically port 3260) and allows organizations to implement SANs using existing IP infrastructure rather than dedicated Fibre Channel networks.",
  port: "TCP 3260",
  versions: ["RFC 3720 (iSCSI)", "RFC 7143 (iSCSI MIB)"],
  advantages: [
    "Leverages existing IP networks for SAN",
    "Cost-effective compared to Fibre Channel",
    "Supports long-distance SAN connections",
    "Works with standard Ethernet hardware"
  ],
  disadvantages: [
    "Higher latency compared to Fibre Channel",
    "Requires TCP/IP tuning for high-performance SAN",
    "Security depends on network configuration (should use IPsec)"
  ],
  useCases: [
    "Enterprise SAN over IP",
    "Data center storage networks",
    "Disaster recovery over WAN",
    "Virtualized storage environments"
  ],
  relatedProtocols: ["tcp", "nvmeof", "fcoe", "iscsi"],
  resources: [
    {
      title: "RFC 3720 - iSCSI",
      url: "https://datatracker.ietf.org/doc/html/rfc3720",
      type: "RFC"
    }
  ],
  securityConsiderations: [
    "TCP/IP-based attacks possible if network is untrusted",
    "Use authentication (CHAP) and encryption (IPsec) for secure deployments",
    "Firewalls should restrict access to iSCSI targets"
  ],
  examples: [
    {
      title: "Basic iSCSI Target and Initiator Setup",
      explanation: "An enterprise configures an iSCSI target on a storage server and connects to it from a Linux server using open-iscsi, enabling block storage over the network.",
      code: `# On the target server (Linux):
sudo apt install targetcli-fb
sudo targetcli
# Create a backstore, target, and LUN, then allow initiator access

# On the initiator (Linux):
sudo apt install open-iscsi
sudo iscsiadm -m discovery -t sendtargets -p <target-ip>
sudo iscsiadm -m node -T <target-iqn> -p <target-ip> --login`
    }
  ]
};
