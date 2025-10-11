import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Client } from "@/lib/types/client";
import FormPage from "./Form";
import { ClientView } from "@/lib/api/clients";
import { DetailsPage } from "./Details";

interface ModalProps {
    client: Client;
    view: ClientView;
    onClose: () => void;
    onChangeView: (view: ClientView) => void;
}

const Modal = ({ client, view, onClose, onChangeView }: ModalProps) => {
    return (
        <Dialog open={!!view} onOpenChange={() => onClose()}>
            <DialogContent className="max-w-2xl">
                <DialogTitle className={cn("sr-only")}>
                    {view === 'create' && 'Create New Client'}
                    {view === 'edit' && 'Edit Client'}
                    {view === 'show' && 'Client Details'}
                </DialogTitle>
                {view !== 'show' && <FormPage onClose={onClose} client={client} />}
                {view === 'show' && <DetailsPage onClose={onClose} client={client} onEdit={() => onChangeView('edit')} />}
            </DialogContent>
        </Dialog>
    )
}

export default Modal
