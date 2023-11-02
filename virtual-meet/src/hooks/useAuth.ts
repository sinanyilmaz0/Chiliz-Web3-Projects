import { useAppContext } from "@/contexts/AppContext";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

export function useAuth() {
    const { setAddress, setIsConnected } = useAppContext();
    const { address, isConnected } = useAccount()
    const { connect } = useConnect({
        connector: new InjectedConnector(),
    })
    const { disconnect } = useDisconnect()

    const handleConnect = async () => {
        try{
            if(isConnected) {
                await handleDisconnect()
            }
            await connect();
            setAddress(address ?? "");
            setIsConnected(true);
        }catch(e){
            console.log("Disconnect Error", e)
        }
    };

    const handleDisconnect = async () => {
        try{
            await disconnect();
            setAddress(address ?? "");
            setIsConnected(false);
        }catch(e){
            console.log("Disconnect Error", e)
        }
    };

    return {
        address,
        isConnected,
        handleConnect,
        handleDisconnect,
    };
}