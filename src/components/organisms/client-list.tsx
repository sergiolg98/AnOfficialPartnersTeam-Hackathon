import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";

enum ClientStatus {
  ACTIVE = "active",
  PENDING = "pending",
  INACTIVE = "inactive",
}

interface Client {
  name: string;
  description: string;
  status: ClientStatus;
}

const clients: Client[] = [
  {
    name: "Acme Corporation",
    description: "Leading provider of innovative cloud solutions",
    status: ClientStatus.ACTIVE,
  },
  {
    name: "TechStart Industries",
    description: "Emerging startup in AI and machine learning",
    status: ClientStatus.PENDING,
  },
  {
    name: "Global Dynamics",
    description: "International consulting and strategy firm",
    status: ClientStatus.INACTIVE,
  },
  {
    name: "EcoSolutions",
    description: "Sustainable energy and environmental services",
    status: ClientStatus.ACTIVE,
  },
];

const getStatusColor = (status: ClientStatus): string => {
  switch (status) {
    case ClientStatus.ACTIVE:
      return "bg-green-500 hover:bg-green-600";
    case ClientStatus.PENDING:
      return "bg-yellow-500 hover:bg-yellow-600";
    case ClientStatus.INACTIVE:
      return "bg-gray-500 hover:bg-gray-600";
    default:
      return "bg-gray-500 hover:bg-gray-600";
  }
};

const ClientCard: React.FC<{ client: Client }> = ({ client }) => (
  <Card className="transition-shadow duration-300 hover:shadow-lg">
    <CardHeader>
      <div className="flex items-center justify-between">
        <CardTitle className="text-xl font-bold">{client.name}</CardTitle>
        <Badge
          className={`${getStatusColor(client.status)} capitalize text-white`}
        >
          {client.status}
        </Badge>
      </div>
    </CardHeader>
    <CardContent>
      <p className="text-gray-600">{client.description}</p>
    </CardContent>
    <CardFooter className="flex justify-end">
      <button className="text-sm font-medium text-blue-600 hover:text-blue-800">
        View Details →
      </button>
    </CardFooter>
  </Card>
);

const ClientList: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">
      {clients.map((client, index) => (
        <ClientCard key={index} client={client} />
      ))}
    </div>
  );
};

export default ClientList;
