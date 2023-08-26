import csv
import os

root_daic_dataset = f'C:/Users/Shira/Documents/Hackathon 2023/DAIC dataset/'

def load_conversations_from_csv(csv_file):
    conversations = []
    with open(csv_file, 'r') as file:
        reader = csv.reader(file, delimiter='\t')
        for row in reader:
            conversations.append(row)
    return conversations

def save_formatted_data_to_csv(formatted_data, output_csv_file):
    with open(output_csv_file, 'w', newline='') as file:
        writer = csv.writer(file)
        for conversation in formatted_data:
            writer.writerow(conversation)

for i in range(300, 493):
    specific_file_path = root_daic_dataset + str(i) + '_P/' + str(i) + '_TRANSCRIPT.csv'
    output_csv_file_path = root_daic_dataset + str(i) + '_P/' + str(i) + '_TRANSCRIPT_formatted.csv'
    if os.path.exists(specific_file_path):
        formatted_data = load_conversations_from_csv(specific_file_path)
        save_formatted_data_to_csv(formatted_data, output_csv_file_path)
        print('patient ' + str(i) + ' transcript was formatted successfully')
    else:
        print('patient ' + str(i) + ' transcript was not found')

# Print the formatted data
# for conversation in formatted_data:
#     print('Columns:', len(conversation))
#     print('Data:', conversation)
#     print()
