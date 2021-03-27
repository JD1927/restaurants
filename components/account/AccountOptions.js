import { map } from 'lodash';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, ListItem, Text } from 'react-native-elements';
import { ORANGE } from '../../utils/global.colors';
import Modal from '../Modal';
import UpdateEmailForm from './UpdateEmailForm';
import UpdateFullNameForm from './UpdateFullNameForm';
import UpdatePasswordForm from './UpdatePasswordForm';

export default function AccountOptions({ user, toast, setReloadUser }) {
  const [showModal, setShowModal] = useState(false);
  const [renderComponent, setRenderComponent] = useState(<Text>loading...</Text>);

  const generateOptions = () => {
    return [
      {
        title: 'Change your full name',
        iconNameLeft: 'account-circle',
        iconColorLeft: `${ORANGE}`,
        iconNameRight: 'chevron-right',
        iconColorRight: `${ORANGE}`,
        onPress: () => selectedOption('name')
      },
      {
        title: 'Change your email',
        iconNameLeft: 'at',
        iconColorLeft: `${ORANGE}`,
        iconNameRight: 'chevron-right',
        iconColorRight: `${ORANGE}`,
        onPress: () => selectedOption('email')
      },
      {
        title: 'Change your password',
        iconNameLeft: 'lock-reset',
        iconColorLeft: `${ORANGE}`,
        iconNameRight: 'chevron-right',
        iconColorRight: `${ORANGE}`,
        onPress: () => selectedOption('password')
      }
    ];
  }

  const selectedOption = (key) => {
    switch (key) {
      case 'name':
        setRenderComponent(
          <UpdateFullNameForm 
            name={user.displayName}
            setShowModal={setShowModal}
            toast={toast}
            setReloadUser={setReloadUser}
          />
        );
        break;
      case 'email':
        setRenderComponent(
          <UpdateEmailForm 
            email={user.email}
            setShowModal={setShowModal}
            toast={toast}
            setReloadUser={setReloadUser}
          />
        );
        break;
      case 'password':
        setRenderComponent(
          <UpdatePasswordForm 
            setShowModal={setShowModal}
            toast={toast}
          />
        );
        break;
    
      default:
        setRenderComponent(
          <Text>none</Text>
        );
        break;
    }
    setShowModal(true);
  };
  
  const options = generateOptions();
  
  return (
    <View>
      {
        map(options, (option, index) => (
          <ListItem 
            key={index}
            style={styles.item}
            onPress={option.onPress}>
            <Icon
              color={option.iconColorLeft}
              name={option.iconNameLeft}
              type='material-community'>

            </Icon>
            <ListItem.Content>
              <ListItem.Title style={styles.itemTitle}>{option.title}</ListItem.Title>
            </ListItem.Content>
            <Icon
              color={option.iconColorRight}
              name={option.iconNameRight}
              type='material-community'>
            </Icon>
          </ListItem>
        ))
      }
      <Modal
        isVisible={showModal}
        setVisible={setShowModal}
        children={renderComponent}>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    borderBottomWidth: 1,
    borderBottomColor: `${ORANGE}`,
  },
  itemTitle: {
    fontFamily: 'Poppins',
  }
});
