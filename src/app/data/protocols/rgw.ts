import { Protocol } from "../../types/protocol";

export const RGW: Protocol = {
    id: "rgw",
    name: "RGW",
    category: "Infrastructure",
    difficulty: "Advanced",
    shortDescription: "RADOS Gateway for object storage with S3/Swift compatibility",
    fullDescription: "RGW (RADOS Gateway) is an object storage interface built on top of librados to provide applications with a RESTful gateway to Ceph Storage Clusters. It provides S3 and Swift compatible APIs, making it easy to migrate existing applications to use Ceph storage.",
    port: "7480 (HTTP), 7443 (HTTPS)",
    advantages: [
      "S3 and Swift API compatibility",
      "Multi-tenancy support",
      "Built-in load balancing",
      "Metadata indexing",
      "Data compression",
      "Versioning support"
    ],
    disadvantages: [
      "Complex configuration",
      "Resource intensive",
      "Network latency impact",
      "Limited atomic operations",
      "Metadata overhead",
      "Consistency model limitations"
    ],
    useCases: [
      "Cloud object storage",
      "Backup and archival",
      "Content distribution",
      "Media storage",
      "Static website hosting",
      "Data lakes",
      "Application data storage",
      "Container registries",
      "Multi-cloud storage",
      "Disaster recovery",
      "Big data analytics",
      "IoT data collection"
    ],
    examples: [
      {
        title: "RGW Configuration",
        code: `# ceph.conf
[client.rgw.gateway]
    host = gateway-node
    keyring = /var/lib/ceph/radosgw/ceph-rgw.gateway/keyring
    log file = /var/log/ceph/client.rgw.gateway.log
    rgw frontends = civetweb port=7480
    rgw dns name = rgw.example.com
    rgw enable apis = s3, swift
    rgw zone = default
    rgw zonegroup = default

# Start RGW daemon
sudo systemctl start ceph-radosgw@rgw.gateway
sudo systemctl enable ceph-radosgw@rgw.gateway

# Create RGW user
radosgw-admin user create --uid=testuser --display-name="Test User"
radosgw-admin key create --uid=testuser --key-type=s3

# List users
radosgw-admin user list`,
        explanation: "RGW configuration and user management setup."
      },
      {
        title: "S3 API Usage with RGW",
        code: `import boto3

# Configure S3 client for RGW
s3_client = boto3.client(
    's3',
    endpoint_url='http://rgw.example.com:7480',
    aws_access_key_id='ACCESS_KEY',
    aws_secret_access_key='SECRET_KEY',
    region_name='default'
)

# Create bucket
s3_client.create_bucket(Bucket='mybucket')

# Upload object
s3_client.put_object(
    Bucket='mybucket',
    Key='myfile.txt',
    Body=b'Hello, RGW!'
)

# List objects
response = s3_client.list_objects_v2(Bucket='mybucket')
for obj in response.get('Contents', []):
    print(obj['Key'])

# Download object
obj = s3_client.get_object(Bucket='mybucket', Key='myfile.txt')
content = obj['Body'].read()
print(content.decode())`,
        explanation: "Using RGW with S3-compatible API through boto3 Python library."
      }
    ],
    relatedProtocols: ["rados", "http", "https"],
    resources: [
      {
        title: "RGW Documentation",
        url: "https://docs.ceph.com/en/latest/radosgw/",
        type: "Documentation"
      },
      {
        title: "S3 API Compatibility",
        url: "https://docs.ceph.com/en/latest/radosgw/s3/",
        type: "Documentation"
      }
    ],
    securityConsiderations: [
      "Access key management",
      "Bucket policies",
      "HTTPS encryption",
      "Authentication tokens",
      "Network security",
      "Audit logging"
    ]
};
