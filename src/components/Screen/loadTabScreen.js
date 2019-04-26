import {Navigation} from 'react-native-navigation'
import Icon from 'react-native-vector-icons/FontAwesome'

const navStyle = {
    navBarTextColor: '#ffffff',
    navBarTextFontSize: 20,
    navBarTextFontFamily:'RobotoCondensed-Bold',
    navBarBackgroundColor:'#00ADA9',
    navBarTitleTextCentered: true
}
const loadTabScreen = (allow)=>{
    Promise.all([
        Icon.getImageSource('search', 30, 'white'),
        Icon.getImageSource('dollar', 30, 'white'),
        Icon.getImageSource('bars', 30, 'white')
    ]).then(source=>{
        Navigation.startTabBasedApp({
            tabs:[{
                screen: 'example.Home',
                label: 'Home',
                title: 'Home',
                icon: source[0],
                navigatorButtons:{
                    rightButtons:[
                        {
                            icon: source[2],
                            disableIconTint: true,
                            navBarButtonColor: 'white',
                            title: 'Drawer',
                            id: 'drawer'
                        } 
                    ]
                },
                navigatorStyle: navStyle
            },
            {
                screen: allow? 'example.AddPost':'example.NotAllow',
                label: 'AddPost',
                title: 'AddPost',
                icon: source[1],
                navigatorButtons:{
                    rightButtons:[
                        {
                            icon: source[2],
                            disableIconTint: true,
                            navBarButtonColor: 'white',
                            title: 'Drawer',
                            id: 'drawer'
                        }
                    ]
                },
                navigatorStyle: navStyle 
            }
        ],
        tabsStyle:{
            tabBarSelectedButtonColor:'#FFC636',
            tabBarButtonColor:'grey',
            tabBarBackgroundColor:'white',
            tabBarTranslucent: false,
            tabBarTextFontFamily:'RobotoCondensed-Bold'
        },
        appStyle:{
            tabBarSelectedButtonColor:'#FFC636',
            tabBarButtonColor:'grey',
            tabBarBackgroundColor:'white',
            tabBarTranslucent: false,
            tabBarTextFontFamily:'RobotoCondensed-Bold',
            navBarButtonColor: 'white',
            keepStyleAcrossPush: true
        },
        drawer:{
            right:{
                screen: 'example.Sidedrawer',
                fixedWidth: 600
            }
        }
        })
    })
}

export default loadTabScreen