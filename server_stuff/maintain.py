#!/usr/bin/env python3
import os
import supabase
from dotenv import load_dotenv
from datetime import date
"""
Supabase database maintenance script.
Checking if link expiration date is due and deleting it accordingly.
"""

load_dotenv("/data/gitclone/pb138-link-shortener/.env")

URL: str = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
KEY: str = os.environ.get("NEXT_PUBLIC_SUPABASE_SERVICE_KEY")
NOW = date.today().isoformat()


client = supabase.create_client(URL, KEY)
client.table("links").delete().lt("expirationDate", NOW).execute()
