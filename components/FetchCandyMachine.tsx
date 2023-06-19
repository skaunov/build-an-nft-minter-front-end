import { useConnection } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import {Metaplex, CandyMachine} from "@metaplex-foundation/js";
import { FC, useEffect, useState } from "react";
import styles from "../styles/custom.module.css";
import { Button } from "@chakra-ui/react";

export const FetchCandyMachine: FC = () => {
    const [candyMachine_address, setCandyMachineAddress] = useState("54wKuRLdQut7dsccSiPBqHCx749RCdQDSjLPa5GcT1bp");
    const [candyMachineData, setCandyMachineData] = useState<CandyMachine|null>(null);
    const [pageItems, setPageItems] = useState([{name: "", image: ""}]);
    const [page, setPage] = useState(1);

    const {connection} = useConnection();
    const metaplex = Metaplex.make(connection);

    const fetchCandyMachine = async () => {
        setPage(1);
        try {
            // if (!candyMachine_address) {throw Error("address string isn't defined");}
            const candyMachine = await metaplex.candyMachines().findByAddress({
                address: new PublicKey(candyMachine_address)
            })/* .run() */;

            setCandyMachineData(candyMachine);
        }
        catch(err) {      alert(err);}
    };
    const getPage = async (page: number, perPage: number) => {
        if (candyMachineData) {
            const pageItems = candyMachineData.items.slice(
                (page - 1) * perPage,
                page * perPage
            );
            let nftData = [];
            for (let i = 0; i < pageItems.length; i++) {
                let fetchResult = await fetch(pageItems[i].uri);
                let json = await fetchResult.json();
                nftData.push(json);
                // console.log(nftData);
            }
            console.log(nftData);
            setPageItems(nftData);
        }
        else {alert("Please submit a valid CMv2 address.");}
    }
    const prev = async () => {
        if (page - 1 < 1) {
        setPage(1)
        } else {
        setPage(page - 1)
        }
    }
    const next = async () => {
        setPage(page + 1)
    }
    useEffect(
        () => {fetchCandyMachine()},
        []
    );
    useEffect(
        () => {
            if (!candyMachineData) {return;}
            getPage(page, 9);
        },
        [candyMachineData, page]
    );

    return (<div>
        <input 
            type="text" 
            // className="form-control block mb-2 w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none text-center"
            placeholder={candyMachine_address}
            onChange={(ev) => setCandyMachineAddress(ev.target.value)}
        />
        <Button onClick={fetchCandyMachine}>Fetch</Button>
        {/* <button
            className="px-8 m-2 btn animate-pulse bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-pink-500 hover:to-yellow-500"
            onClick={fetchCandyMachine}
        >Fetch</button> */}

        {candyMachineData && (<div className="flex flex-col items-center justify-center p-5">
            <ul>Candy Machine address: {candyMachineData.address.toString()}</ul>
        </div>)}

        {pageItems && (<div>
            <div className={styles.gridNFT}>{pageItems.map(
                (nft) => (<div className={styles.innerwrapper} key={nft.image}>
                    <div className={styles.content}>
                        <img src={nft.image} alt={nft.name} className={styles.imgnft} />
                        <div className={styles.nftinfo}><div className={styles.nftinfoname}>
                            {nft.name}    
                        </div></div>
                    </div>
                </div>)
            )}</div>
            <button 
                className="px-8 m-2 btn animate-pulse bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-pink-500 hover:to-yellow-500 ..."
                onClick={prev}
            >Prev</button>
            <button 
                className="px-8 m-2 btn animate-pulse bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-pink-500 hover:to-yellow-500 ..."
                onClick={next}
            >Next</button>
        </div>)}
    </div>);
};