import React, {Component} from 'react';
import {Dimensions, StyleSheet, Text, View, ScrollView} from 'react-native';
import {navigatorDrawer, navigatorDeepLink, gridTwoColumns} from '../../Utils/misc'
import HorizontalScroll from './Horizontal_Scroll'
import {connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import {getArticle} from '../../Store/action/article_action'
import Icon from 'react-native-vector-icons/FontAwesome'
import BlockItems from './BlockItems'
class Home extends Component{
    constructor(props) {
        super(props);
        this.state={
            isLoading: true,
            article:[],
            categories:['All', 'Sports', 'Music', 'Electronics', 'Clothing'],
            categorySelected: 'All'
        }
        this.props.navigator.setOnNavigatorEvent(event=>{
            navigatorDeepLink(event, this)
            navigatorDrawer(event, this)

        });
    }
    categoryColorHandler =(value)=>{
        this.setState({
            isLoading: true,
            categorySelected: value,
            article:[]
        })
        this.props.getArticle(value).then(()=>{
            const newArticles = gridTwoColumns(this.props.Articles.list)
            this.setState({
             isLoading: false,
             article: newArticles
         })
         })
    }
    componentDidMount(){
        this.props.getArticle('All').then(()=>{
           const newArticles = gridTwoColumns(this.props.Articles.list)
           this.setState({
            isLoading: false,
            article: newArticles
        })
        })
    }
    articleDetail = (props)=>{
       this.props.navigator.push({
           screen: 'example.ArticleDetails',
           animationType: "slide-horizontal",
           passProps:{
               articleData: props
           },
           backButtonTitle: 'Back to Home',
           navigatorStyle: {
            navBarTextFontSize: 20 ,
              navBarTextColor: '#ffffff',
              navBarTextFontFamily: 'RobotoCondensed-Bold',
              navBarBackgroundColor: '#00ADA9',
              screenBackgroundColor: '#ffffff'
           }
       })
    }
    showArticle =()=>(
        this.state.article.map((item, i)=>(
          <BlockItems
            key={`columnHome-${i}`}
            item={item}
            iteration={i}
            itemDetail ={this.articleDetail}
            />))
    
    )
    render(){
        return(
            <ScrollView>
                <View style={styles.container}>
                    <HorizontalScroll
                    categories={this.state.categories}
                    categorySelected={this.state.categorySelected}
                    categoryColorHandler={this.categoryColorHandler}/>
                     {
                         this.state.isLoading?
                            <View style={styles.isLoading}>
                                <Icon name='gears' size={30} color = 'lightgrey'/>
                                <Text style={{color:'lightgrey'}}>Loading....</Text>
                            </View>
                        :null
                        }
                        <View style={styles.articleContaire}>
                            <View style={{flex: 1}}>
                                {this.showArticle()}
                            </View>
                        </View>
                </View>
                
            </ScrollView>
           
        )
    }
}

const styles = StyleSheet.create({
    isLoading:{
      flex: 1,
      alignItems: 'center',
      marginTop: Dimensions.get('window').height * 0.3,
    },
    articleContaire:{
        flex: 1,
        padding: 10,
        justifyContent: 'space-between',
        flexDirection: 'row',
    }
})

function  mapStateToProps(state){
    return {
        Articles: state.Articles
    }
}
function  mapDispatchToProps(dispatch){
    return bindActionCreators({getArticle}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps) (Home)