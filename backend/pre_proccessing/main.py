import csv
import os
import pandas as pd
import string
from nltk.stem import PorterStemmer
from nltk.stem import WordNetLemmatizer
from nltk.corpus import stopwords
from nltk.tokenize import SpaceTokenizer
# nltk.download('stopwords')
# nltk.download('wordnet')
# nltk.download('omw-1.4')

root_daic_dataset = f'C:/Users/Shira/Documents/Hackathon 2023/DAIC dataset/'

specific_file_path = root_daic_dataset + '302_P/302_TRANSCRIPT_formatted.csv'
metadata_mapped_path = root_daic_dataset + 'metadata_mapped.csv'
# output_csv_file_path = root_daic_dataset + '302_P/302_TRANSCRIPT_formatted.csv'

def load_file_from_csv(file_path):
    file = pd.read_csv(file_path)
    return file

def stack_conversation_rows(conversation):
    stacked_conversation = ''
    for index, row in conversation.iterrows():
        stacked_conversation = stacked_conversation + row['value'] + '. '
    return stacked_conversation

def save_data_to_csv(data, output_csv_file):
    with open(output_csv_file, 'w', newline='') as file:
        writer = csv.writer(file)
        for conversation in data:
            writer.writerow(conversation)

def preprocess_text(text):
    # Lowercase the text
    text = text.lower()
    # Remove punctuation
    text = "".join([t for t in text if t not in string.punctuation])
    # Split the text into tokens
    tokens = SpaceTokenizer().tokenize(text)
    # Remove stop words
    tokens = [t for t in tokens if t not in stopwords.words('english')]
    # Remove stemming
    tokens = [PorterStemmer().stem(t) for t in tokens]
    # Remove lemmatization
    tokens = [WordNetLemmatizer().lemmatize(t) for t in tokens]
    return tokens

conversation = load_file_from_csv(specific_file_path)
metadata_mapped = load_file_from_csv(metadata_mapped_path)
# stacked_conversation = stack_conversation_rows(conversation)
# processed_conversation = preprocess_text(stacked_conversation)
print(metadata_mapped)




# test your code:
# preprocess_text("The BOYS are jumping on the trampoline.")  # need to return ['boy', 'jump', 'trampolin']

# save_formatted_data_to_csv(formatted_data, output_csv_file_path)

# Print the formatted data
# for conversation in formatted_data:
#     print('Columns:', len(conversation))
#     print('Data:', conversation)
#     print()
