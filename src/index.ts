import * as CryptoJS from "crypto-js";

class Block {
  public index: number;
  public hash: string;
  public previousHash: string;
  public data: string;
  public timstamp: number;

  static calculateBlockHash = (
    index: number,
    previousHash: string,
    timstamp: number,
    data: string
  ): string =>
    CryptoJS.SHA256(index + previousHash + timstamp + data).toString();

  constructor(
    index: number,
    hash: string,
    previousHash: string,
    data: string,
    timstamp: number
  ) {
    this.index = index;
    this.hash = hash;
    this.previousHash = previousHash;
    this.data = data;
    this.timstamp = timstamp;
  }
}

const gensisBlck: Block = new Block(0, "2020202020202020", "", "Hello", 123456);

let blockchain: Block[] = [gensisBlck];

const getBlockchain = (): Block[] => blockchain;

const getLastestBlock = (): Block =>
  getBlockchain()[getBlockchain().length - 1];

const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000);

const createNewBlock = (data: string): Block => {
  const previousBlock: Block = getLastestBlock();
  const newIndex: number = previousBlock.index + 1;
  const newTimestamp: number = getNewTimeStamp();
  const newHash: string = Block.calculateBlockHash(
    newIndex,
    previousBlock.hash,
    newTimestamp,
    data
  );
  const newBlock: Block = new Block(
    newIndex,
    newHash,
    previousBlock.hash,
    data,
    newTimestamp
  );

  return newBlock;
};

console.log(createNewBlock("hello"), createNewBlock("bye bye"));
export {};
