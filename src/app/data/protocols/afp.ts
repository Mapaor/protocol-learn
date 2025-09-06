import { Protocol } from "../../types/protocol";

export const AFP: Protocol = {
    id: "afp",
    name: "AFP",
    category: "Files",
    difficulty: "Intermediate",
    shortDescription: "Apple Filing Protocol for file sharing in Apple networks",
    fullDescription: "AFP (Apple Filing Protocol) is a proprietary network protocol that offers file services for macOS and classic Mac OS. AFP currently supports Unicode file names, POSIX and access control list permissions, resource forks, named extended attributes, and advanced file locking.",
    port: "548",
    versions: ["AFP 1.0", "AFP 2.0", "AFP 3.0", "AFP 3.1", "AFP 3.2", "AFP 3.3", "AFP 3.4"],
    advantages: [
      "Native macOS integration",
      "Resource fork support",
      "POSIX compliance",
      "Unicode file names",
      "Advanced file locking",
      "Metadata preservation",
      "Time Machine integration",
      "Bonjour discovery"
    ],
    disadvantages: [
      "Apple ecosystem limited",
      "Performance over WAN",
      "Legacy protocol",
      "Limited cross-platform support",
      "Deprecated by Apple",
      "Complex configuration",
      "Security limitations",
      "Maintenance overhead"
    ],
    useCases: [
      "Mac file sharing",
      "Creative workflows",
      "Media production",
      "Design collaboration",
      "Legacy Mac networks",
      "Time Machine backups",
      "Application sharing",
      "Mac server environments",
      "Cross-platform Mac access",
      "Educational institutions",
      "Publishing workflows",
      "Audio/video editing"
    ],
    examples: [
      {
        title: "AFP Server Configuration (Netatalk)",
        code: `# /etc/netatalk/afp.conf
[Global]
    mimic model = TimeCapsule6,106
    log level = default:warn
    log file = /var/log/afpd.log
    hosts allow = 192.168.1.0/24
    
    # Authentication
    uam list = uams_dhx2.so uams_dhx.so
    guest account = nobody
    
    # Performance
    tcp rcvbuf = 131072
    tcp sndbuf = 131072
    
    # Features
    spotlight = yes
    zeroconf = yes

[TimeMachine]
    path = /srv/timemachine
    valid users = tmuser
    time machine = yes
    vol size limit = 1000000

[Shared]
    path = /srv/afp/shared
    valid users = @users
    rwlist = @admin
    rolist = @guest
    unix priv = yes
    file perm = 0644
    directory perm = 0755

[Homes]
    basedir regex = /home
    valid users = %u
    home name = $u Home`,
        explanation: "Netatalk AFP server configuration for macOS file sharing."
      },
      {
        title: "AFP Mount Commands",
        code: `# macOS AFP mounting

# Command line mount
mount -t afp afp://username:password@server/volume /Volumes/AFP

# Using mount_afp
mount_afp afp://server/share /Volumes/share

# With authentication
mount_afp "afp://user:pass@192.168.1.100/SharedFiles" /Volumes/SharedFiles

# Secure AFP over SSH tunnel
ssh -L 10548:localhost:548 server
mount_afp "afp://localhost:10548/volume" /Volumes/volume

# AppleScript automation
tell application "Finder"
    mount volume "afp://server/volume"
end tell

# Unmount AFP share
umount /Volumes/share
diskutil unmount /Volumes/share

# List AFP shares
showmount -e server

# AFP URL formats
afp://server/volume
afp://user@server/volume
afp://user:password@server/volume
afp://server:port/volume`,
        explanation: "AFP mounting and connection commands for macOS clients."
      },
      {
        title: "AFP Protocol Commands",
        code: `# AFP Protocol Command Structure
+----------------+
| Command Code   | (1 byte)
+----------------+
| Parameters     | (variable)
+----------------+

# Common AFP Commands:
- FPOpenVol (2): Open volume
- FPCloseVol (3): Close volume
- FPOpenFork (26): Open file fork
- FPCloseFork (4): Close file fork
- FPRead (27): Read from fork
- FPWrite (33): Write to fork
- FPCreateFile (32): Create file
- FPDelete (10): Delete file/directory
- FPRename (11): Rename file/directory
- FPEnumerate (9): List directory contents
- FPGetFileDirParms (34): Get file/directory info
- FPSetFileDirParms (35): Set file/directory info

# AFP Error Codes:
- noErr (0): No error
- afpAccessDenied (-5000): Access denied
- afpAuthContinue (-5001): Continue authentication
- afpBadUAM (-5002): Invalid authentication method
- afpBadVersNum (-5003): Invalid version
- afpBitmapErr (-5004): Invalid bitmap
- afpCantMove (-5005): Cannot move file
- afpDenyConflict (-5006): Deny conflict
- afpDirNotEmpty (-5007): Directory not empty`,
        explanation: "AFP protocol command structure and error codes."
      }
    ],
    diagrams: [
      {
        src: "/afp_architecture.png",
        alt: "AFP architecture",
        caption: "AFP protocol architecture and file sharing structure"
      },
      {
        src: "/afp_evolution.jpg",
        alt: "AFP evolution",
        caption: "Evolution of AFP protocol versions and features"
      }
    ],
    relatedProtocols: ["smb", "nfs", "tcp", "bonjour"],
    resources: [
      {
        title: "Apple Filing Protocol Reference",
        url: "https://developer.apple.com/library/archive/documentation/Networking/Reference/AFP_Reference/",
        type: "Documentation"
      },
      {
        title: "Netatalk Project",
        url: "http://netatalk.sourceforge.net/",
        type: "Tool"
      },
      {
        title: "AFP to SMB Migration Guide",
        url: "https://support.apple.com/en-us/HT204445",
        type: "Guide"
      }
    ],
    securityConsiderations: [
      "Migrate to SMB for security",
      "Use encrypted connections",
      "Strong authentication methods",
      "Network access controls",
      "Regular security updates",
      "Monitor file access",
      "Backup configurations",
      "Limit protocol exposure"
    ]
  }