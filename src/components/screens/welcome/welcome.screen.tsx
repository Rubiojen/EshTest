import {AppHeader} from 'components/basic/appHeader';
import {AppButton} from 'components/basic/buttons';
import {ScreenView} from 'components/basic/views';
import {InputUser} from 'components/widgets/inputs/inputUser';
import React, {useState} from 'react';
import {View} from 'react-native';
import {useSetUser} from 'state/userState';
import {Consts, GS} from 'utils/globalStyles';
import {validateName} from 'utils/helpers';
import {Strings} from 'utils/strings';

export const WelcomeScreen = () => {
  const [newUser, setNewUser] = useState(Consts.emptyUser);
  const setUser = useSetUser();

  const loginUser = () => {
    setUser({...newUser, isLoggedIn: true});
  };

  return (
    <ScreenView dismissKeyboardOnTouch>
      <AppHeader hasBack={false} />
      <View style={[GS.flexOne]}>
        <View style={[GS.flexOne, GS.justifyCenter, GS.marginHorizontal24]}>
          <InputUser
            updateKey="userName"
            placeholder={Strings.enterName}
            user={newUser}
            setUser={setNewUser}
          />
        </View>
      </View>
      <AppButton
        style={[GS.marginBottom32]}
        variant="bodyBold18"
        onPress={loginUser}
        disabled={!validateName(newUser.userName)}
        text={Strings.login}
      />
    </ScreenView>
  );
};
