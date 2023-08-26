import csv
import os
import pandas as pd
import math
import string
from nltk.stem import PorterStemmer
from nltk.stem import WordNetLemmatizer
from nltk.corpus import stopwords
from nltk.tokenize import SpaceTokenizer
# nltk.download('stopwords')
# nltk.download('wordnet')
# nltk.download('omw-1.4')

root_daic_dataset = f'C:/Users/Shira/Documents/Hackathon 2023/DAIC dataset/'

metadata_mapped_path = root_daic_dataset + 'metadata_mapped.csv'
output_csv_file_path = root_daic_dataset + 'data_with_labels.csv'
binary_class_output_path = root_daic_dataset + 'data_with_binary_labels.csv'
daic_data_output_path = root_daic_dataset + 'binary_class_data_daic_only.csv'

def load_file_from_csv(file_path):
    file = pd.read_csv(file_path)
    return file

def stack_conversation_rows(conversation):
    stacked_conversation = ''
    for index, row in conversation.iterrows():
        stacked_conversation = stacked_conversation + str(row['value']) + '. '
    return stacked_conversation

def save_data_to_csv(data, output_csv_file):
    data.to_csv(output_csv_file, index=True)

def concat_text_with_metadata(metadata):
    metadata_with_text = metadata.copy()  # assign(text = '')
    for index, row in metadata.iterrows():
        participant_id = row['Participant_ID']
        if participant_id in range(300, 493):
            current_file_path = root_daic_dataset + str(participant_id) + '_P/' + \
                                str(participant_id) + '_TRANSCRIPT_formatted.csv'
            conversation = load_file_from_csv(current_file_path)
            metadata_with_text.at[index, 'text'] = stack_conversation_rows(conversation)
    return metadata_with_text

def convert_label(label):
    return math.floor(label / 6)

def process_labels(data):
    data['depression_level_class'] = data['PHQ_Score'].map(lambda x: convert_label(x))
    return data

def delete_middle_classes(data):
    two_class_data = data[(data['depression_level_class'] == 0) | (data['depression_level_class'] == 3)]
    two_class_data['depression_level_class'] = \
        two_class_data['depression_level_class'].map(lambda x: x if x == 0 else 1)
    return two_class_data

def remove_samples_without_text(data):
    return data[(data['Participant_ID'] >= 300) & (data['Participant_ID'] <= 492)]

metadata_mapped = load_file_from_csv(metadata_mapped_path)
data = concat_text_with_metadata(metadata_mapped)
data = data.drop(['Gender', 'PHQ_Binary', 'PCL-C (PTSD)', 'PTSD Severity'], axis=1)
data = process_labels(data)
binary_class_data = delete_middle_classes(data)
data_of_daic_only = remove_samples_without_text(binary_class_data)

save_data_to_csv(data, output_csv_file_path)
save_data_to_csv(binary_class_data, binary_class_output_path)
save_data_to_csv(data_of_daic_only, daic_data_output_path)

# print(data.head())
print(binary_class_data.head())
# print(data.at[5, 'PHQ_Score'])
# print(data.at[5, 'depression_level_class'])
# print(data.columns.tolist())
