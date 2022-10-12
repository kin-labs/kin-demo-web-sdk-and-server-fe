import { KineticSdk } from '@kin-kinetic/sdk';

import { getPublicKey } from '..';

interface HandleGetBalance {
  kineticClient: KineticSdk;
  user: string;
  kinNetwork: string;
  onSuccess: (arg: string) => void;
  onFailure: () => void;
}

export async function handleGetBalance({
  onSuccess,
  onFailure,
  user,
  kineticClient,
  kinNetwork,
}: HandleGetBalance) {
  console.log('🚀 ~ handleGetBalance', user);
  try {
    const publicKey = getPublicKey(user, kinNetwork);

    const { balance } = await kineticClient.getBalance({
      account: publicKey,
    });

    const balanceInKin = Number(balance) / 100000;
    console.log('🚀 ~ balanceInKin', balanceInKin);

    onSuccess(balanceInKin.toString());
  } catch (error) {
    console.log('🚀 ~ error', error);
    onFailure();
  }
}
