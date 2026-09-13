import re

with open('temp_source/database.sql', 'r', encoding='utf-8') as f:
    data = f.read()

# Find the INSERT INTO wp_posts block
pattern = re.compile(r"INSERT INTO \`wp_posts\` VALUES\s*(.*?);", re.DOTALL)
match = pattern.search(data)
if not match:
    print("No INSERT INTO wp_posts VALUES found")
    exit(1)

values_str = match.group(1)
# Split the values string into rows. We'll split by "),(" but we have to handle the parentheses.
# Remove the leading and trailing parentheses if present.
if values_str.startswith('('):
    values_str = values_str[1:]
if values_str.endswith(')'):
    values_str = values_str[:-1]
# Now split by "),("
rows = values_str.split('),(')
print(f"Found {len(rows)} rows in wp_posts")

# Now parse each row to get the ID, post_title, post_status, post_type, post_name, post_date
# We know the order of columns from the CREATE TABLE we saw earlier.
# Let's get the column order from the CREATE TABLE statement to be safe.
# But for simplicity, we'll assume the order as we saw in the CREATE TABLE.
# We'll print the first few rows to see the structure.

# We'll define the column indices based on the CREATE TABLE we saw earlier.
# From the CREATE TABLE we saw:
#   ID, post_author, post_date, post_date_gmt, post_content, post_title, post_excerpt, post_status, comment_status, ping_status, post_password, post_name, to_ping, pinged, post_modified, post_modified_gmt, post_content_filtered, post_parent, guid, menu_order, post_type, post_mime_type, comment_count
# So:
#   0: ID
#   1: post_author
#   2: post_date
#   3: post_date_gmt
#   4: post_content
#   5: post_title
#   6: post_excerpt
#   7: post_status
#   8: comment_status
#   9: ping_status
#   10: post_password
#   11: post_name
#   12: to_ping
#   13: pinged
#   14: post_modified
#   15: post_modified_gmt
#   16: post_content_filtered
#   17: post_parent
#   18: guid
#   19: menu_order
#   20: post_type
#   21: post_mime_type
#   22: comment_count

# We'll parse each row by splitting by commas, but we have to be careful of commas inside quotes.
# We'll use a simple approach: split by ',' and then clean the quotes.
# This is not perfect but should work for this data because the content is escaped and we don't have commas inside the content that are not escaped? Actually, the content may have commas.
# Instead, we can use the fact that we know the number of columns and the order, and that the content is in field 4 and 5, which are longtext and text, and may contain commas.
# We'll use a CSV parser for each row, but we don't have the column names.

# Let's use the Python csv module to parse each row as a CSV line, but note: the values are not quoted consistently? They are quoted with single quotes.
# We'll replace the single quotes with double quotes and then use csv.reader.

# However, the content may have escaped single quotes (like &#8217; which is not a quote) and also may have single quotes that are escaped as \'.
# This is getting too complex.

# Given the time, let's just print the raw rows for the first few and then we can see the pattern.

for i, row in enumerate(rows):
    # Split the row by commas, but we know there are 23 columns.
    # We'll split by ',' and then take the first 23 elements, but if there are more due to commas in content, we'll have to adjust.
    # Let's just split and see how many we get.
    parts = row.split(',')
    print(f"Row {i}: {len(parts)} parts")
    if len(parts) >= 23:
        # We have at least the expected number of columns.
        ID = parts[0].strip()
        post_author = parts[1].strip()
        post_date = parts[2].strip()
        post_content = parts[4].strip()
        post_title = parts[5].strip()
        post_status = parts[7].strip()
        post_name = parts[11].strip()
        post_type = parts[20].strip()
        # Clean the quotes: remove the leading and trailing single quotes if present.
        def clean(val):
            if val.startswith("'") and val.endswith("'"):
                return val[1:-1]
            return val
        ID = clean(ID)
        post_author = clean(post_author)
        post_date = clean(post_date)
        post_content = clean(post_content)
        post_title = clean(post_title)
        post_status = clean(post_status)
        post_name = clean(post_name)
        post_type = clean(post_type)
        print(f"  ID: {ID}, Title: {post_title}, Slug: {post_name}, Status: {post_status}, Type: {post_type}, Date: {post_date}, Author: {post_author}")
    else:
        print(f"  Row {i} has unexpected number of parts: {len(parts)}")
        print(f"  First 10 parts: {parts[:10]}")
