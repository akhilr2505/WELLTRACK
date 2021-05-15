from flask import Flask, request
from flask_restful import Resource, Api
import tweepy
from textblob import TextBlob
from flask_cors import CORS


# Twitter API Credentials
consumer_key = '7SJKo24zsAE7jDaDj11t67XtB'
consumer_secret = 'hE73Hmmr1sWhKBTLKoLhJfxvSoGkjaETMxWAhY04svLnX0THPL'
access_token = '1174627187074334721-oLtXbcRuhhy3MAJf7P37rIwPslBawZ'
access_token_secret = 'mMLqtglr3NcM4JQJWQPlZlpOEJ0YOeBH8xihAqTFGpPQ3'

print(consumer_key)
app = Flask(__name__)
CORS(app)
api = Api(app)
tweets = []
t_data = {} #dictionary for twitter data
my_json = {"tweets": []} 
lang_data = {} #dictionary for language data


def generate_lang_data(lang):
    global lang_data
    if lang in lang_data:
        val = lang_data[lang]
        lang_data[lang] = val + 1
    else:
        lang_data[lang] = 1


def get_tweets(keyword):
    global tweets, consumer_key, consumer_secret, access_token, access_token_secret, t_data, my_json,lang_data

    auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
    auth.set_access_token(access_token, access_token_secret)
    tweet_api = tweepy.API(auth)
    public_tweets = tweet_api.search(q=keyword, count=20)
    lang_data.clear()
    my_json["tweets"].clear()
    for tweet in public_tweets:
        tweets.append(tweet.text)
        t_data = {
            "Tweet_Text": tweet.text,
            "url": 'https://twitter.com/' + str(tweet.user.id) + '/status/' + str(tweet.id),
            "user_name": tweet.user.name,
            "screen_name": tweet.user.screen_name,
            "created_at" : str(tweet.created_at),
            "name":tweet.user.name,
            "profile_image":tweet.user.profile_image_url_https
        }
        generate_lang_data(tweet.lang)
        my_json["tweets"].append(t_data)
    
    return tweets


def sentiment(text):
    analysis = TextBlob(text)
    if analysis.sentiment.polarity > 0:
        return "Positive"

    if analysis.sentiment.polarity == 0:
        return "Neutral"

    if analysis.sentiment.polarity < 0:
        return "Negative"


def get_polarity(fetched_tweets):
    global my_json, lang_data

    pos = 0
    neg = 0
    neu = 0

    for tw in fetched_tweets:
        pol = sentiment(tw)
        if pol == 'Positive':
            pos = pos + 1

        if pol == 'Neutral':
            neu = neu + 1

        if pol == 'Negative':
            neg = neg + 1

    try:
        pos_p = (pos / len(fetched_tweets)) * 100
    except:
        pos_p = 0

    try:
        neg_p = (neg / len(fetched_tweets)) * 100
    except:
        neg_p = 0

    try:
        neu_p = (neu / len(fetched_tweets)) * 100
    except:
        neu_p = 0
    

    pol_dict_data = {"positive": pos_p, "negative": neg_p, "neutral": neu_p}
    sent_dict = {"Sentiment": pol_dict_data, "Tweets": my_json, "Languages": lang_data}
    return sent_dict


class Sentiment(Resource):

    def get(self):
        query = request.args.get('query')
        fetched_tweets = get_tweets(query)
        pol = get_polarity(fetched_tweets)
        return pol

api.add_resource(Sentiment, '/')

if __name__ == '__main__':
    app.run(debug=True)
