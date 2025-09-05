  import { Protocol } from "../../types/protocol";
  
  export const SPIRE: Protocol = {
    id: "spire",
    name: "SPIRE",
    category: "Security",
    difficulty: "Advanced",
    shortDescription: "SPIFFE Runtime Environment for workload identity management",
    fullDescription: "SPIRE (SPIFFE Runtime Environment) is a toolchain of APIs for establishing trust between software systems across a wide variety of hosting platforms. It exposes the SPIFFE Workload API and is responsible for node and workload attestation, X.509 and JWT-SVID issuance and rotation.",
    advantages: [
      "Production-ready SPIFFE implementation",
      "Automatic identity rotation",
      "Multiple attestation methods",
      "Scalable architecture",
      "Plugin-based design",
      "Zero-downtime updates"
    ],
    disadvantages: [
      "Complex deployment",
      "Resource overhead",
      "Operational complexity",
      "Learning curve",
      "Plugin dependencies",
      "High availability setup"
    ],
    useCases: [
      "Kubernetes workload identity",
      "Service mesh security",
      "Multi-cloud identity",
      "Container attestation",
      "Zero-trust implementation",
      "Microservices security",
      "Cloud-native identity",
      "Workload certification",
      "Dynamic environments",
      "Certificate management",
      "Identity federation",
      "Secure bootstrapping"
    ],
    examples: [
      {
        title: "SPIRE Server Configuration",
        code: `# spire-server.conf
server {
    bind_address = "0.0.0.0"
    bind_port = "8081"
    trust_domain = "example.com"
    data_dir = "/opt/spire/data/server"
    log_level = "INFO"
    ca_ttl = "168h"
    default_svid_ttl = "1h"
}

plugins {
    DataStore "sql" {
        plugin_data {
            database_type = "postgres"
            connection_string = "postgres://user:pass@localhost/spire"
        }
    }

    NodeAttestor "k8s_sat" {
        plugin_data {
            clusters = {
                "production" = {
                    service_account_whitelist = ["spire:spire-agent"]
                }
            }
        }
    }

    KeyManager "disk" {
        plugin_data {
            keys_path = "/opt/spire/data/server/keys.json"
        }
    }

    Notifier "k8sbundle" {
        plugin_data {
            config_map = "spire-bundle"
            namespace = "spire"
        }
    }
}`,
        explanation: "SPIRE Server configuration showing plugins for data storage, node attestation, and key management."
      },
      {
        title: "SPIRE Agent Configuration",
        code: `# spire-agent.conf
agent {
    data_dir = "/opt/spire/data/agent"
    log_level = "INFO"
    server_address = "spire-server"
    server_port = "8081"
    trust_bundle_path = "/opt/spire/conf/agent/bootstrap.crt"
    trust_domain = "example.com"
}

plugins {
    NodeAttestor "k8s_sat" {
        plugin_data {
            cluster = "production"
        }
    }

    KeyManager "disk" {
        plugin_data {
            directory = "/opt/spire/data/agent"
        }
    }

    WorkloadAttestor "k8s" {
        plugin_data {
            # Verify workload using Kubernetes metadata
            skip_kubelet_verification = true
        }
    }

    WorkloadAttestor "unix" {
        plugin_data {
            # Verify workload using Unix process attributes
        }
    }
}`,
        explanation: "SPIRE Agent configuration for Kubernetes workload attestation and identity management."
      },
      {
        title: "SPIRE CLI Operations",
        code: `# Create registration entries
spire-server entry create \
    -spiffeID spiffe://example.com/frontend \
    -parentID spiffe://example.com/spire/agent/k8s_sat/production/node1 \
    -selector k8s:ns:default \
    -selector k8s:sa:frontend-service

spire-server entry create \
    -spiffeID spiffe://example.com/database \
    -parentID spiffe://example.com/spire/agent/k8s_sat/production/node2 \
    -selector k8s:ns:default \
    -selector k8s:sa:database-service

# List entries
spire-server entry show

# Create bundle
spire-server bundle show -format pem > trust-bundle.pem

# Agent operations
spire-agent api fetch -socketPath /tmp/agent.sock
spire-agent api fetch-jwt -audience spiffe://example.com/database

# Health checks
spire-server healthcheck
spire-agent healthcheck

# Token generation for node attestation
spire-server token generate -spiffeID spiffe://example.com/spire/agent/k8s_sat/production/node1`,
        explanation: "SPIRE CLI commands for managing registration entries, bundles, and workload identities."
      },
      {
        title: "Kubernetes SPIRE Deployment",
        code: `# SPIRE Server Deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: spire-server
  namespace: spire
spec:
  replicas: 1
  selector:
    matchLabels:
      app: spire-server
  template:
    metadata:
      labels:
        app: spire-server
    spec:
      serviceAccountName: spire-server
      containers:
      - name: spire-server
        image: ghcr.io/spiffe/spire-server:1.8.0
        args:
          - -config
          - /run/spire/config/server.conf
        ports:
        - containerPort: 8081
        volumeMounts:
        - name: spire-config
          mountPath: /run/spire/config
          readOnly: true
        - name: spire-data
          mountPath: /run/spire/data
        livenessProbe:
          httpGet:
            path: /live
            port: 8080
          failureThreshold: 2
          initialDelaySeconds: 15
          periodSeconds: 60
          timeoutSeconds: 3
        readinessProbe:
          httpGet:
            path: /ready
            port: 8080
          initialDelaySeconds: 5
          periodSeconds: 5

# SPIRE Agent DaemonSet
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: spire-agent
  namespace: spire
spec:
  selector:
    matchLabels:
      app: spire-agent
  template:
    metadata:
      labels:
        app: spire-agent
    spec:
      hostPID: true
      hostNetwork: true
      dnsPolicy: ClusterFirstWithHostNet
      serviceAccountName: spire-agent
      containers:
      - name: spire-agent
        image: ghcr.io/spiffe/spire-agent:1.8.0
        args:
          - -config
          - /run/spire/config/agent.conf
        volumeMounts:
        - name: spire-config
          mountPath: /run/spire/config
          readOnly: true
        - name: spire-bundle
          mountPath: /run/spire/bundle
        - name: spire-agent-socket
          mountPath: /run/spire/sockets
        - name: var-run-secrets
          mountPath: /var/run/secrets/tokens`,
        explanation: "Kubernetes deployment manifests for SPIRE Server and Agent with proper configuration and volumes."
      }
    ],
    diagrams: [
      {
        src: "/spire-architecture.png",
        alt: "SPIRE architecture diagram",
        caption: "SPIRE server and agent architecture with workload attestation flow"
      }
    ],
    relatedProtocols: ["spiffe", "mtls", "x509"],
    commonCommands: [
      {
        command: "spire-server",
        description: "SPIRE Server management",
        example: "spire-server entry create -spiffeID ..."
      },
      {
        command: "spire-agent",
        description: "SPIRE Agent operations",
        example: "spire-agent api fetch"
      }
    ],
    resources: [
      {
        title: "SPIRE Documentation",
        url: "https://spiffe.io/docs/latest/spire/",
        type: "Documentation"
      },
      {
        title: "SPIRE GitHub Repository",
        url: "https://github.com/spiffe/spire",
        type: "Repository"
      }
    ],
    securityConsiderations: [
      "Secure server deployment",
      "Node attestation security",
      "Workload attestation policies",
      "Trust bundle protection",
      "Database security",
      "Plugin security validation"
    ]
  }