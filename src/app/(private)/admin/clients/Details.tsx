import { Client } from '@/lib/types/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


interface DetailsPageProps {
    client: Client;
    onClose: () => void;
    onEdit: () => void;
}

export const DetailsPage = ({ client, onClose, onEdit }: DetailsPageProps) => {
  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Detalles del Cliente</h1>
        <Button variant="outline" onClick={onClose}>
          Cerrar
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              {client.image_url ? (
                <AvatarImage src={client.image_url} alt={client.full_name} />
              ) : (
                <AvatarFallback className="bg-primary/10 text-primary text-xl">
                  {getInitials(client.full_name)}
                </AvatarFallback>
              )}
            </Avatar>
            <div>
              <CardTitle className="text-xl">{client.full_name}</CardTitle>
              <p className="text-sm text-muted-foreground">Cliente</p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Correo Electrónico</h3>
                <p className="text-base">
                  <a href={`mailto:${client.email}`} className="text-primary hover:underline">
                    {client.email}
                  </a>
                </p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Teléfono</h3>
                <p className="text-base">
                  <a href={`tel:${client.phone}`} className="text-primary hover:underline">
                    {client.phone || 'No especificado'}
                  </a>
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Dirección</h3>
                <p className="text-base">{client.address || 'No especificada'}</p>
              </div>
              
              {client.image_url && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Imagen de Perfil</h3>
                  <div className="mt-1">
                    <img 
                      src={client.image_url} 
                      alt={`${client.full_name} avatar`} 
                      className="h-32 w-32 rounded-md object-cover"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
