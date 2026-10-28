import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const bundledDataPath = path.join(process.cwd(), 'lib/data/properties.json');
const dataFilePath = '/tmp/properties.json';

function readData() {
  // If /tmp file doesn't exist, try to seed it from bundled data
  if (!fs.existsSync(dataFilePath)) {
    if (fs.existsSync(bundledDataPath)) {
      const bundledData = fs.readFileSync(bundledDataPath, 'utf-8');
      fs.writeFileSync(dataFilePath, bundledData, 'utf-8');
      return JSON.parse(bundledData);
    }
    return [];
  }
  const jsonData = fs.readFileSync(dataFilePath, 'utf-8');
  return JSON.parse(jsonData);
}

function writeData(data: any) {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const properties = readData();
    const property = properties.find((p: any) => p.id === id);
    if (!property) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }
    return NextResponse.json(property);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read property' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const updatedData = await req.json();
    const properties = readData();
    
    const index = properties.findIndex((p: any) => p.id === id);
    if (index === -1) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }
    
    properties[index] = { ...properties[index], ...updatedData, id }; // Ensure ID doesn't change
    writeData(properties);
    
    return NextResponse.json(properties[index]);
  } catch (error: any) {
    console.error(`Error in PUT /api/properties/${id}:`, error);
    return NextResponse.json({ 
      error: 'Failed to update property', 
      details: error.message || 'Unknown error'
    }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const properties = readData();
    const newProperties = properties.filter((p: any) => p.id !== id);
    
    if (properties.length === newProperties.length) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }
    
    writeData(newProperties);
    return NextResponse.json({ message: 'Property deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete property' }, { status: 500 });
  }
}
