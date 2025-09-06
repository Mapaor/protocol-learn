import { Protocol } from "../../types/protocol";

export const WEBDAV: Protocol = {
    id: "webdav",
    name: "WebDAV",
    category: "Files",
    difficulty: "Intermediate",
    shortDescription: "Web Distributed Authoring and Versioning for collaborative file management",
    fullDescription: "WebDAV (Web Distributed Authoring and Versioning) is an extension of HTTP that allows clients to perform remote web content authoring operations. It provides a framework for users to create, change, and move documents on a server.",
    port: "80 (HTTP), 443 (HTTPS)",
    versions: ["WebDAV Level 1", "WebDAV Level 2", "DeltaV"],
    advantages: [
      "HTTP-based protocol",
      "Cross-platform support",
      "File locking mechanisms",
      "Versioning support",
      "Metadata handling",
      "Collaborative editing",
      "Firewall friendly",
      "Standards-based"
    ],
    disadvantages: [
      "Performance overhead",
      "Complex implementation",
      "Limited caching",
      "Synchronization conflicts",
      "Security considerations",
      "Bandwidth intensive",
      "Limited offline support",
      "Compatibility issues"
    ],
    useCases: [
      "Remote file editing",
      "Document collaboration",
      "Content management systems",
      "Calendar and contact sharing",
      "Version control systems",
      "Cloud storage services",
      "Online office suites",
      "Digital asset management",
      "Wiki systems",
      "Photo sharing",
      "Backup solutions",
      "Remote development"
    ],
    examples: [
      {
        title: "WebDAV HTTP Methods",
        code: `# WebDAV extends HTTP with additional methods:

# PROPFIND - Retrieve properties
PROPFIND /documents/ HTTP/1.1
Host: server.example.com
Content-Type: application/xml
Content-Length: 142

<?xml version="1.0" encoding="utf-8"?>
<D:propfind xmlns:D="DAV:">
  <D:prop>
    <D:displayname/>
    <D:getcontentlength/>
    <D:getlastmodified/>
  </D:prop>
</D:propfind>

# PROPPATCH - Modify properties
PROPPATCH /documents/file.txt HTTP/1.1
Host: server.example.com
Content-Type: application/xml

# MKCOL - Create collection
MKCOL /documents/newfolder/ HTTP/1.1
Host: server.example.com

# COPY - Copy resource
COPY /documents/file.txt HTTP/1.1
Host: server.example.com
Destination: /documents/backup/file.txt

# MOVE - Move resource
MOVE /documents/file.txt HTTP/1.1
Host: server.example.com
Destination: /documents/archive/file.txt

# LOCK - Lock resource
LOCK /documents/file.txt HTTP/1.1
Host: server.example.com
Content-Type: application/xml`,
        explanation: "WebDAV HTTP method extensions for file operations."
      },
      {
        title: "WebDAV Client (JavaScript)",
        code: `class WebDAVClient {
    constructor(baseUrl, username, password) {
        this.baseUrl = baseUrl;
        this.auth = btoa(\`\${username}:\${password}\`);
    }
    
    async propfind(path, depth = 1) {
        const response = await fetch(\`\${this.baseUrl}\${path}\`, {
            method: 'PROPFIND',
            headers: {
                'Authorization': \`Basic \${this.auth}\`,
                'Content-Type': 'application/xml',
                'Depth': depth.toString()
            },
            body: \`<?xml version="1.0" encoding="utf-8"?>
                <D:propfind xmlns:D="DAV:">
                    <D:prop>
                        <D:displayname/>
                        <D:getcontentlength/>
                        <D:getlastmodified/>
                        <D:resourcetype/>
                    </D:prop>
                </D:propfind>\`
        });
        
        return response.text();
    }
    
    async mkcol(path) {
        const response = await fetch(\`\${this.baseUrl}\${path}\`, {
            method: 'MKCOL',
            headers: {
                'Authorization': \`Basic \${this.auth}\`
            }
        });
        
        return response.ok;
    }
    
    async upload(path, file) {
        const response = await fetch(\`\${this.baseUrl}\${path}\`, {
            method: 'PUT',
            headers: {
                'Authorization': \`Basic \${this.auth}\`,
                'Content-Type': file.type
            },
            body: file
        });
        
        return response.ok;
    }
}`,
        explanation: "JavaScript WebDAV client implementation with basic operations."
      },
      {
        title: "Apache WebDAV Configuration",
        code: `# Apache mod_dav configuration
LoadModule dav_module modules/mod_dav.so
LoadModule dav_fs_module modules/mod_dav_fs.so

<Directory "/var/www/webdav">
    # Enable WebDAV
    Dav On
    
    # Authentication
    AuthType Basic
    AuthName "WebDAV Area"
    AuthUserFile /etc/apache2/webdav.users
    Require valid-user
    
    # Permissions
    AllowOverride None
    Options Indexes
    
    # WebDAV specific settings
    DavMinTimeout 600
    DavDepthInfinity Off
    
    # Lock database
    DavLockDB /var/lock/apache2/DavLock
    
    # File operations
    <LimitExcept GET POST OPTIONS>
        Require valid-user
    </LimitExcept>
</Directory>

# Virtual host example
<VirtualHost *:443>
    ServerName webdav.example.com
    DocumentRoot /var/www/webdav
    
    SSLEngine on
    SSLCertificateFile /etc/ssl/certs/server.crt
    SSLCertificateKeyFile /etc/ssl/private/server.key
    
    <Location />
        Dav On
        AuthType Basic
        AuthName "Secure WebDAV"
        AuthUserFile /etc/apache2/webdav.users
        Require valid-user
    </Location>
</VirtualHost>`,
        explanation: "Apache configuration for WebDAV server with authentication and SSL."
      }
    ],
    diagrams: [
      {
        src: "/webdav_architecture.png",
        alt: "WebDAV architecture",
        caption: "WebDAV protocol structure and client-server interaction"
      },
      {
        src: "/webdav_methods.jpg",
        alt: "WebDAV methods",
        caption: "WebDAV HTTP method extensions and their purposes"
      }
    ],
    relatedProtocols: ["http", "https", "caldav", "carddav"],
    resources: [
      {
        title: "RFC 4918 - WebDAV",
        url: "https://tools.ietf.org/html/rfc4918",
        type: "RFC"
      },
      {
        title: "WebDAV Resources",
        url: "http://www.webdav.org/",
        type: "Documentation"
      },
      {
        title: "Apache mod_dav",
        url: "https://httpd.apache.org/docs/2.4/mod/mod_dav.html",
        type: "Documentation"
      }
    ],
    securityConsiderations: [
      "Strong authentication required",
      "HTTPS for sensitive data",
      "Access control lists",
      "Input validation",
      "File upload restrictions",
      "Directory traversal prevention",
      "Resource locking security",
      "Audit logging"
    ]
  }