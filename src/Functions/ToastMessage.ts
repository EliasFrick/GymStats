import Toast from 'react-native-root-toast';

export default function ToastMessage(text: string) {
    Toast.show(text, {
        duration: Toast.durations.SHORT,
    });
}
