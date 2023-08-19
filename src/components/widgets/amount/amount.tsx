import {AppText} from 'components/basic/texts';
import React from 'react';
import {GS} from 'utils/globalStyles';

interface AmountProps {
  amount: string;
}

export const Amount = ({amount}: AmountProps) => {
  const [number, cents] = amount.split('.');

  return (
    <AppText>
      <AppText variant="bodySemibold16">${'\u2008'}</AppText>
      <AppText style={[GS.paddingHorizontal12]} variant="bodySemibold20">
        {Number(number).toLocaleString()}
      </AppText>
      <AppText variant="bodySemibold16">.{cents}</AppText>
    </AppText>
  );
};
