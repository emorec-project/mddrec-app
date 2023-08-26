import math
import pandas as pd
from functools import reduce
from sklearn.model_selection import train_test_split

root_daic_dataset = f'C:/Users/Shira/Documents/Hackathon 2023/DAIC dataset/'

specific_file_path = root_daic_dataset + '302_P/302_TRANSCRIPT_formatted.csv'
metadata_mapped_path = root_daic_dataset + 'metadata_mapped.csv'
output_csv_file_path = root_daic_dataset + 'data_with_labels.csv'
data_output_path = root_daic_dataset + 'data_with_features_ron_method.csv'
binary_class_data_output_path = root_daic_dataset + 'binary_class_data_with_features_ron_method.csv'

def load_file_from_csv(file_path):
    file = pd.read_csv(file_path)
    return file

def get_current_file_path(participant_id):
    return root_daic_dataset + str(participant_id) + '_P/' + str(participant_id) + '_TRANSCRIPT_formatted.csv'

def save_data_to_csv(data, output_csv_file):
    data.to_csv(output_csv_file, index=True)

def total(series):
    return reduce(lambda x, y: str(x) + ". " + str(y), series)

def preprocess_participant_data(data):
    data["delta"] = data["stop_time"] - data["start_time"]
    data_by_participant = data.groupby(["speaker"]) \
        .agg({"delta": ["mean", "sum", "min", "max"], "value": [total]})
    data_by_participant.columns = data_by_participant.columns.droplevel()
    participant_row = data_by_participant[data_by_participant.index == "Participant"]
    no_participant_row = data_by_participant[data_by_participant.index != "Participant"]
    processed_data = no_participant_row.reset_index(drop=True).join(participant_row.reset_index(drop=True),
                                                            lsuffix="_ellie", rsuffix="_participant")
    return processed_data

def convert_label(label):
    return math.floor(label / 6)

def processed_data_with_metadata(metadata):
    full_data = pd.DataFrame()
    for index, row in metadata.iterrows():
        participant_id = row['Participant_ID']
        if participant_id in range(300, 489):
            current_file_path = get_current_file_path(participant_id)
            participant_data = load_file_from_csv(current_file_path)
            processed_participant_data = preprocess_participant_data(participant_data)
            processed_participant_data['Participant_ID'] = participant_id
            processed_participant_data['PHQ_Score'] = row['PHQ_Score']
            processed_participant_data['depression_level_class'] = convert_label(row['PHQ_Score'])
            processed_participant_data['AVECParticipant_ID'] = row['AVECParticipant_ID']
            full_data = pd.concat([full_data, processed_participant_data], ignore_index=True)
    return full_data

def delete_middle_classes(data):
    two_class_data = data[(data['depression_level_class'] == 0) | (data['depression_level_class'] == 3)]
    two_class_data['depression_level_class'] = \
        two_class_data['depression_level_class'].map(lambda x: x if x == 0 else 1)
    return two_class_data

# participant_data = load_file_from_csv(specific_file_path)
# participant_processed_data = preprocess_data(participant_data)
# print(participant_processed_data)

metadata_mapped = load_file_from_csv(metadata_mapped_path)
data = processed_data_with_metadata(metadata_mapped)
binary_class_data = delete_middle_classes(data)

# save_data_to_csv(data, data_output_path)
save_data_to_csv(binary_class_data, binary_class_data_output_path)

print(data.head())

