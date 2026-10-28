import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'lib/data/properties.json');

function readData() {
  if (!fs.existsSync(dataFilePath)) {
    return [];
  }
  const jsonData = fs.readFileSync(dataFilePath, 'utf-8');
  return JSON.parse(jsonData);
}

function writeData(data: any) {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
}

export async function GET() {
  try {
    const properties = readData();
    return NextResponse.json(properties);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read properties' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const newProperty = await req.json();
    
    // Ensure directory exists
    const dir = path.dirname(dataFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const properties = readData();
    
    const propertyWithId = {
      ...newProperty,
      id: Date.now().toString()
    };
    
    properties.push(propertyWithId);
    writeData(properties);
    
    return NextResponse.json(propertyWithId, { status: 201 });
  } catch (error: any) {
    console.error('Error in POST /api/properties:', error);
    return NextResponse.json({ 
      error: 'Failed to add property', 
      details: error.message || 'Unknown error'
    }, { status: 500 });
  }
}
